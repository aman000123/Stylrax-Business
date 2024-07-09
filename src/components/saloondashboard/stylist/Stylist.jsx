import React, { useEffect, useState } from "react";
import styles from "./Stylist.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { salonStaff } from "../../../api/salon.management";
import Notify from "../../../utils/notify";
import { Skeleton } from "@mui/material"; // Import Skeleton from Material-UI

function Stylist({ selectedSalon }) {
  const [staff, setStaff] = useState([]);
  const salonId = selectedSalon.id;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await salonStaff(salonId);
        const staff = response.data;
        setStaff(staff);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    if (salonId) {
      getStaff();
    }
  }, [salonId]);

  // Show skeleton loading while waiting for staff
  if (staff.length === 0) {
    return (
      <div className={styles.mainDiv}>
        <div className={styles.secDiv}>
          <h4 style={{ color: "#000000" }}>Stylist</h4>
        </div>
        <div className={styles.content}>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Skeleton variant="rectangular" width="100%" height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.secDiv}>
        <h4 style={{ color: "#000000" }}>Stylist</h4>
      </div>
      <div className={styles.content}>
        {staff.map((value, index) => (
          <div key={index} className={styles.paper}>
            <div className={styles.stylist}>
              <div>
                <img src={value.profileImageUrl} alt="" />
              </div>
              <div className={styles.aboutStylist}>
                <p>
                  {capitalizeFirstLetter(value.firstName)} {capitalizeFirstLetter(value.lastName)}
                  <br />
                  <span className={styles.spanOne}>{value.specialization}</span>
                  <br />
                  <span className={styles.spanTwo}>{value.role}</span>
                </p>
              </div>
            </div>
            <div>
              <MoreHorizIcon className={styles.dots} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stylist;
