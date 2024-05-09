import styles from "../SalonTime/SalonTime.module.css";
import { IoTimeSharp, IoAlertCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
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
  const [add, setAdd] = useState(false);
  const [timing, setTiming] = useState([]);

  useEffect(() => {
    const getSalonTime = async () => {
      try {
        const res = await salonBusinessTime(salonId);
        console.log("salon time", res.data);
        setTiming(res.data);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    
    if (salonId) {
      getSalonTime();
    } else {
      console.error("Salon ID is not valid.");
    }
  }, [salonId]);

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    try {
      const data = openTimeData.map((dayData, index) => ({
        day: dayData.day,
        isOpen: values[`isOpen${index}`],
        openTime: values[`openTime${index}`],
        closeTime: values[`closeTime${index}`]
      }));
      console.log("data", data);
      const res = await salonTime(salonId, data);
      console.log("res::::>", res);
    } catch (error) {
      console.log("error::>", error);
      Notify.error(error.message);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.actionButton}>
        <button className={styles.salon}>Salon</button>
        {!add && (
          <button
            type="button"
            className={styles.addTime}
            onClick={() => setAdd(!add)}
          >
            Add
          </button>
        )}
      </div>

      <Formik
        initialValues={{
          ...openTimeData.reduce((acc, dayData, index) => {
            const timingOfDay = timing.find(timingData => timingData.day === dayData.day); // Find corresponding timing data for the day
            acc[`isOpen${index}`] = timingOfDay ? timingOfDay.isOpen : false; // Set isOpen to timing data if available, otherwise false
            acc[`openTime${index}`] = timingOfDay ? timingOfDay.openTime : ''; // Set openTime to timing data if available, otherwise empty string
            acc[`closeTime${index}`] = timingOfDay ? timingOfDay.closeTime : ''; // Set closeTime to timing data if available, otherwise empty string
            return acc;
          }, {})
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {openTimeData.map((dayData, index) => {
              const day = dayData.day;

              return (
                <div key={index} className={styles.secDiv}>
                  <div className={styles.day}>{day}</div>

                  <div className={styles.timeDiv}>
                    <div className={styles.height}>
                      <Field
                        type="text"
                        name={`openTime${index}`}
                        className={styles.spanOne}
                      />
                      <span className={styles.spanTwo}>Open</span>
                    </div>
                    {values[`isOpen${index}`] ? (
                      <IoTimeSharp className={styles.timeIcon} />
                    ) : (
                      <IoAlertCircleOutline className={styles.timeIcon} />
                    )}
                  </div>

                  <div className={styles.timeDiv}>
                    <div className={styles.height}>
                      <Field
                        type="text"
                        name={`closeTime${index}`}
                        className={styles.spanOne}
                      />
                      <span className={styles.spanTwo}>Close</span>
                    </div>
                  </div>

                  <div>
                    <Switch
                      checked={values[`isOpen${index}`]}
                      onChange={(e) => {
                        setFieldValue(`isOpen${index}`, e.target.checked);
                        if (!e.target.checked) {
                          setFieldValue(`openTime${index}`, "");
                          setFieldValue(`closeTime${index}`, "");
                        }
                      }}
                    />
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
    </div>
  );
}

export default SalonTime;
