import styles from "../SalonTime/SalonTime.module.css";
import { IoTimeSharp, IoAlertCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { salonBusinessTime, salonTime } from "../../../api/salon.management";
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
        const defaultTiming = openTimeData.map((dayData) => {
          const dayTiming = res.data.find((timingData) => timingData.day === dayData.day);
          return {
            day: dayData.day,
            isOpen: dayTiming ? dayTiming.isOpen : false,
            openTime: dayTiming ? dayTiming.openTime : '',
            closeTime: dayTiming ? dayTiming.closeTime : '',
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
    try {
      const updatedTiming = timing.map((dayTiming, index) => ({
        day: dayTiming.day,
        isOpen: values[`isOpen${index}`],
        openTime: values[`openTime${index}`],
        closeTime: values[`closeTime${index}`],
      }));

      await salonTime(salonId, updatedTiming);
      Notify.success("Salon timings updated successfully.");
      setAdd(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.actionButton}>
        {/* <button className={styles.salon}>Salon</button> */}
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
            <Form>
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
                        <Field
                          type="text"
                          name={`openTime${index}`}
                          value={values[`openTime${index}`]}
                          disabled={!add}
                          className={styles.spanOne}
                        />
                        <span>Open Time</span>
                      </div>
                      {/* <IoTimeSharp/> */}
                    </div>

                    <div className={styles.timeDi}>
                      <div className={styles.height}>
                        <Field
                          type="text"
                          name={`closeTime${index}`}
                          value={values[`closeTime${index}`]}
                          disabled={!add}
                          className={styles.spanTwo}
                        />
                        <span>Close Time</span>
                      </div>
                    </div>

                    <div className={`${styles.circleDiv}`}>
                      <FaCircle
                        onClick={add ? handleToggle : null}
                        className={`${styles.blackCircle} ${values[`isOpen${index}`] ? styles.iconOpen : styles.iconClose}`}
                      />
                      {/* {values[`isOpen${index}`] ? <p>Open</p> : <p>Close</p>} */}
                    </div>
                  </div>
                );
              })}
              {add && (
                <button
                  className={styles.addTime}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default SalonTime;
