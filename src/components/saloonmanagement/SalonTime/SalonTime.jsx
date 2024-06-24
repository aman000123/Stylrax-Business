import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaCircle } from "react-icons/fa";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { salonBusinessTime, salonTime } from "../../../api/salon.management";
import TextField from "@mui/material/TextField";
import styles from "../SalonTime/SalonTime.module.css";

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

  useEffect(() => {
    const getSalonTime = async () => {
      try {
        const res = await salonBusinessTime(salonId);
        console.log(" Salon Time Res ::>", res);
        const defaultTiming = openTimeData.map((dayData) => {
          console.log(" Day Data ::", dayData);
          const dayTiming = res.data.find(
            (timingData) => timingData.day === dayData.day
          );
          console.log("Day Timining ::", dayTiming);
          return {
            day: dayData.day,
            isOpen: dayTiming ? dayTiming.isOpen : false,
            openTime: dayTiming ? dayjs(dayTiming.openTime) : "",
            closeTime: dayTiming ? dayjs(dayTiming.closeTime) : "",
          };
        });
        console.log("Day Timining ::::", defaultTiming);

        setTiming(defaultTiming);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalonTime();
  }, [salonId]);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleSubmit = async (values) => {
    console.log("Salon Time Submit ::>", values);
    try {
      const updatedTiming = timing.map((dayTiming, index) => ({
        day: dayTiming.day,
        isOpen: values[`isOpen${index}`],
        openTime: values[`openTime${index}`],
        closeTime: values[`closeTime${index}`],
      }));
console.log(" Salon Updated Time :::", updatedTiming);
      await salonTime(salonId, updatedTiming);
      console.log(" Salon Time :::>", salonTime);
      Notify.success("Salon timings updated successfully.");
      setAdd(false);
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
                acc[`openTime${index}`] = dayTiming.openTime;
                acc[`closeTime${index}`] = dayTiming.closeTime;
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
                      setFieldValue(`openTime${index}`, "");
                      setFieldValue(`closeTime${index}`, "");
                    }
                  };

                  return (
                    <div key={index} className={styles.secDiv}>
                      <div className={styles.day}>{day}</div>

                      <div className={styles.timeDiv}>
                        <div className={styles.height}>
                          <Field name={`openTime${index}`}>
                            {({ field }) => (
                              <TimePicker
                                {...field}
                                value={dayjs(field.value) || null}
                                onChange={(value) => {
                                  console.log("TimePicker :: ", value);
                                  setFieldValue(`openTime${index}`, value);
                                }}
                                disabled={!add}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className={styles.spanOne}
                                  />
                                )}
                              />
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className={styles.timeDi}>
                        <div className={styles.height}>
                          <Field name={`closeTime${index}`}>
                            {({ field }) => (
                              <TimePicker
                                {...field}
                                value={dayjs(field.value) || null}
                                onChange={(value) =>
                                  setFieldValue(`closeTime${index}`, value)
                                }
                                disabled={!add}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className={styles.spanTwo}
                                  />
                                )}
                              />
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className={`${styles.circleDiv} rounded-pill`}>
                        <FaCircle
                          onClick={add ? handleToggle : null}
                          className={`${styles.blackCircle} ${
                            values[`isOpen${index}`]
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