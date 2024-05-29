import { useEffect, useState } from "react";
import styles from "./Stylist.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { salonStaff } from "../../../api/salon.management";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";

function Stylist() {
  const [staff, setStaff] = useState([]);
  const salonId = Session.get("salonId");

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await salonStaff(salonId);
        const staff = response.data;
        console.log("completed::>", staff);
        setStaff(staff);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    getStaff();
  }, [salonId]);

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
                  {value.firstName} {value.lastName}
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
