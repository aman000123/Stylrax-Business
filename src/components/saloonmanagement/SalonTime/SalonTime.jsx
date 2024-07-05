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
import { styled } from "@mui/system";

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

  const CustomTimePicker = styled(TimePicker)({
    '& .MuiInputBase-root': {
      border: '2px solid white',
      boxShadow: '2px 3px 7px #a1acb0',
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      '&:focus, &:focus-within': {
        boxShadow: '2px 3px 7px #a1acb0',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border on hover
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none', // Remove the border
    },
    '& .MuiInputBase-input': {
      border: 'none',
      width: '160px',
      outline: 'none',
      borderRadius: '50px',
      height: '6px',
      '&:focus': {
        outline: 'none', // Remove blue outline on focus
        boxShadow: 'none', // Remove box shadow on focus
        borderColor: 'transparent', // Remove border on focus
        backgroundColor: 'black', // Set background color to black on focus
        color: 'white', // Set text color to white on focus
      },
    },
    '& .Mui-selected': {
      backgroundColor: 'black', // Set background color to black for selected time
      color: 'white', // Set text color to white for selected time
    },
    '& .MuiInputAdornment-root': {
      '&:focus': {
        outline: 'none', // Remove blue outline on focus
        boxShadow: 'none', // Remove box shadow on focus
        borderColor: 'transparent', // Remove border on focus
      },
    },
  });
  
  

  useEffect(() => {
    const getSalonTime = async () => {
      try {
        const res = await salonBusinessTime(salonId);
        // console.log("Salon Time Res ::>", res);
        const defaultTiming = openTimeData.map((dayData) => {
          const dayTiming = res.data.find(
            (timingData) => timingData.day === dayData.day
          );
          return {
            day: dayData.day,
            isOpen: dayTiming ? dayTiming.isOpen : false,
            openTime: dayTiming ? dayjs(dayTiming.openTime) : null,
            closeTime: dayTiming ? dayjs(dayTiming.closeTime) : null,
          };
        });
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
    const updatedTiming = timing.map((dayTiming, index) => {
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
    }).filter((timing) => timing !== null);

    try {
      await salonTime(salonId, updatedTiming);
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
                              <CustomTimePicker
                                {...field}
                                // className="CustomTimePicker"
                                value={field.value || null}
                                onChange={(value) => {
                                  setFieldValue(`openTime${index}`, value);
                                }}
                                disabled={!add}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className={styles.spanOne}
                                  />
                                )}
                                ampm={true}
                              />
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className={styles.timeDi}>
                        <div className={styles.height}>
                          <Field name={`closeTime${index}`}>
                            {({ field }) => (
                              <CustomTimePicker
                                {...field}
                                value={field.value || null}
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
                                ampm={true}
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
