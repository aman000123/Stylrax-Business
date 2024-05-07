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
    
  const initialValues = [
    {day:openTimeData[0].day, isOpen: false, openTime: "", closeTime: "" },
    { day:openTimeData[1].day,isOpen: false, openTime: "", closeTime: "" },
         { day:openTimeData[2].day,isOpen: false, openTime: "", closeTime: "" },
     { day:openTimeData[3].day,isOpen: false, openTime: "", closeTime: "" },
         { day:openTimeData[4].day,isOpen: false, openTime: "", closeTime: "" },
    { day:openTimeData[5].day,isOpen: false, openTime: "", closeTime: "" },
        { day:openTimeData[6].day,isOpen: false, openTime: "", closeTime: "" },
  ]

//   useEffect(() => {
//     const getSalonTime = async () => {
//       try {
//         if (!salonId) {
//           throw new Error("Salon ID is not valid.");
//         }
//         const res = await salonBusinessTime(salonId);
//         console.log("anil::>",res)
//         if (res.data && Array.isArray(res.data)) {
//           setTiming(res.data);
//         } else {
//           throw new Error("Invalid salon business time data received.");
//         }
//       } catch (error) {
//         Notify.error(error.message);
//       }
//     };

//     getSalonTime();
//   }, [salonId]);

//   useEffect(() => {
//     if (timing.length > 0) {
//       const updatedInitialValues = {};
//       openTimeData.forEach(dayData => {
//         const day = dayData.day;
//         const dayTiming = timing.find(item => item.day === day);
//         if (dayTiming) {
//           updatedInitialValues[day] = {
//             isOpen: dayTiming.isOpen,
//             openTime: dayTiming.openTime || "",
//             closeTime: dayTiming.closeTime || ""
//           };
//         } else {
//           updatedInitialValues[day] = {
//             isOpen: false,
//             openTime: "",
//             closeTime: ""
//           };
//         }
//       });
//       setInitialValues(updatedInitialValues);
//     }
//   }, [timing]);

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    const data = [values];
    try {
      const res = await salonTime(salonId, values);
      console.log("res::::>", res);
    } catch (error) {
      console.log("error::>", error);
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

      {initialValues && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              {openTimeData.map((dayData, index) => {
                const day = dayData.day;

                return (
                  <div key={index} className={styles.secDiv}>
                    <div className={styles.day}>{dayData.day}</div>

                    <div className={styles.timeDiv}>
                      <div className={styles.height}>
                        <Field
                          type="time"
                          name={`openTime.${dayData.day}`}
                                                    className={styles.spanOne}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]{2}:[0-9]{2}",
                          }}
                        />
                        <span className={styles.spanTwo}>Open</span>
                      </div>
                      {dayData.isOpen ? (
                        <IoTimeSharp className={styles.timeIcon} />
                      ) : (
                        <IoAlertCircleOutline className={styles.timeIcon} />
                      )}
                    </div>

                    <div className={styles.timeDiv}>
                      <div className={styles.height}>
                        <Field
                          type="time"
                          name={`closeTime.${dayData.day}`} 
                                                    className={styles.spanOne}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]{2}:[0-9]{2}",
                          }}
                        />
                        <span className={styles.spanTwo}>Close</span>
                      </div>
                    </div>

                    <div>
                      <Switch
                        checked={dayData.isOpen}
                        onChange={(e) =>
                          setFieldValue(dayData.isOpen, e.target.checked)
                        }
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
      )}
    </div>
  );
}

export default SalonTime;
