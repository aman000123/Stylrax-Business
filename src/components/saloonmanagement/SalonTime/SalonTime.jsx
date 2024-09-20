import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaCircle } from "react-icons/fa";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { salonBusinessTime, salonTime } from "../../../api/salon.management";
import TextField from "@mui/material/TextField";
import styles from "../SalonTime/SalonTime.module.css";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const salonId = Session.get("salonId");

const openTimeData = [
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
  { day: "Sunday" },
];

function SalonTime() {
  const [timing, setTiming] = useState([]);
  const [add, setAdd] = useState(false);

  const getSalonTime = async () => {
    try {
      const res = await salonBusinessTime(salonId);
      const defaultTiming = openTimeData.map((dayData) => {
        const dayTiming = res.data.find(
          (timingData) => timingData.day === dayData.day
        );
        return {
          day: dayData.day,
          isOpen: dayTiming ? dayTiming.isOpen : false,
          openTime: dayTiming ? dayjs(dayTiming.openTime, 'hh:mm A') : null,
          closeTime: dayTiming ? dayjs(dayTiming.closeTime, 'hh:mm A') : null,
        };
      });
      setTiming(defaultTiming);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getSalonTime();
  }, [salonId]);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleSubmit = async (values) => {
    const updatedTiming = timing
      .map((dayTiming, index) => {
        const isOpenChanged = values[`isOpen${index}`] !== dayTiming.isOpen;
        const openTimeChanged = values[`openTime${index}`] && dayjs(values[`openTime${index}`]).format("hh:mm A") !== dayTiming.openTime?.format("hh:mm A");
        const closeTimeChanged = values[`closeTime${index}`] && dayjs(values[`closeTime${index}`]).format("hh:mm A") !== dayTiming.closeTime?.format("hh:mm A");

        if (isOpenChanged || openTimeChanged || closeTimeChanged) {
          return {
            day: dayTiming.day,
            isOpen: values[`isOpen${index}`],
            openTime: values[`openTime${index}`] ? dayjs(values[`openTime${index}`]).format("hh:mm A") : "",
            closeTime: values[`closeTime${index}`] ? dayjs(values[`closeTime${index}`]).format("hh:mm A") : "",
          };
        }
        return null;
      })
      .filter((timing) => timing !== null);

    try {
      await salonTime(salonId, updatedTiming);
      Notify.success("Salon timings updated successfully.");
      setAdd(false);
      // Fetch updated timing after save
      await getSalonTime();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.mainDiv}>
        <div className={styles.actionButton}>
          {!add && (
            <button
              type="button"
              className={styles.addTime}
              onClick={handleAdd}
            >
              Add
            </button>
          )}
        </div>

        {timing.length > 0 && (
          <Formik
            initialValues={{
              ...timing.reduce((acc, dayTiming, index) => {
                acc[`isOpen${index}`] = dayTiming.isOpen;
                acc[`openTime${index}`] = dayTiming.openTime ? dayjs(dayTiming.openTime) : null;
                acc[`closeTime${index}`] = dayTiming.closeTime ? dayjs(dayTiming.closeTime) : null;
                return acc;
              }, {}),
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className={styles.form}>
                {timing.map((dayTiming, index) => {
                  const { day } = dayTiming;

                  const handleToggle = () => {
                    const isOpen = !values[`isOpen${index}`];
                    setFieldValue(`isOpen${index}`, isOpen);

                    if (!isOpen) {
                      setFieldValue(`openTime${index}`, null);
                      setFieldValue(`closeTime${index}`, null);
                    }
                  };

                  return (
                    <div key={index} className={styles.secDiv}>
                      <div className={styles.day}>{day}</div>

                      <div className={styles.timeDiv}>
                        <div className={styles.height}>
                          <Field name={`openTime${index}`}>
                            {({ field }) => (
                              <DemoContainer components={["TimePicker"]}>
                                <TimePicker
                                  value={values[`openTime${index}`] ? dayjs(values[`openTime${index}`]) : null}
                                  onChange={(newValue) => setFieldValue(`openTime${index}`, newValue)}
                                  viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                  }}
                                  renderInput={(params) => <TextField {...params} onFocus={(e) => e.target.blur()} />}
                                />
                              </DemoContainer>
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className={styles.timeDi}>
                        <div className={styles.height}>
                          <Field name={`closeTime${index}`}>
                            {({ field }) => (
                              <DemoContainer components={["TimePicker"]}>
                                <TimePicker
                                  value={values[`closeTime${index}`] ? dayjs(values[`closeTime${index}`]) : null}
                                  onChange={(newValue) => setFieldValue(`closeTime${index}`, newValue)}
                                  viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                  }}
                                  renderInput={(params) => <TextField {...params} onFocus={(e) => e.target.blur()} />}
                                />
                              </DemoContainer>
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className={`${styles.circleDiv} rounded-pill`}>
                        <FaCircle
                          onClick={add ? handleToggle : null}
                          className={`${styles.blackCircle} ${values[`isOpen${index}`]
                              ? styles.iconOpen
                              : styles.iconClose
                            }`}
                        />
                      </div>
                    </div>
                  );
                })}
                {add && (
                  <div className={styles.btn}>
                    <button
                      className={styles.saveTime}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default SalonTime;
