import { Col } from "react-bootstrap";
import styles from "../ManageStaff/ManageStaff.module.css";
import stylistimg1 from "../../../assets/image/stylistimg1.png";
import { Paper } from "@mui/material";
import { CiCalendar } from "react-icons/ci";
import {
  editStaff,
  getStaff,
  removeStaff,
} from "../../../api/salon.management";
import { useEffect, useState } from "react";
import Notify from "../../../utils/notify";
import { RxCross2 } from "react-icons/rx";
import Session from "../../../service/session";

const paperTwoData = [
  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },

  {
    imgsrc: stylistimg1,
    t1: "Alberta Raya ",
    t2: "HairStyling, HairSPa, Spa ",
    t3: "10:30 Am - 11:00 Pm ",
    t4: "24 Dec, 2024 ",
    t5: " At Home",
    t6: " 100$",
  },
];

function ViewAllAddService({ id, onClose }) {
  const [staff, setStaff] = useState({});
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [specialization,setSpecialization] = useState("");
  const salonId = Session.get("salonId");
  //console.log("aradhya staff::>", staff);
  //console.log("aradhya id::>", id);

  
  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  //get staff
  useEffect(() => {
    const getSalonStaff = async () => {
      try {
        const res = await getStaff(salonId,id);
        const staff = res.data;
        setStaff(staff);
        console.log("staff details::>", id);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    getSalonStaff();
  }, [salonId,id]);

  //DELETE STAFF API

  const onDelete = async (id) => {
    try {
      const deletedStaff = await removeStaff(salonId,id);
      Notify.success("staff deleted");
      //console.log("staff deleted::>",deletedStaff)
    } catch (error) {
      Notify.error(error.message);
      console.log("staff deleted::>", error);
    }
  };

  //Edit Staff
  const onEdit = async (id) => {
    try {
      const updatedData = {
        specialization: specialization,
        role: "Manager"
      };
      const editedStaff = await editStaff(salonId,staff.id,updatedData);
      Notify.success("Updated record");
    
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleClose = () => {
    console.log("Close function triggered");
    onClose();
  };

  const toggleEditMode = () => {
    setEditable(!editable);
  };
  return (
    <div className={styles.popup}>
      {/* <div onClick={handleClose} className={styles.crossIcon}><RxCross2 /></div>              */}
      <Col md={4}>
        <div className={styles.popupFormDiv}>
          <div className={styles.popupFormImgDiv}>
            <span>Staff</span>
            <img src={stylistimg1} alt="" />
          </div>

          <form className={styles.popupForm}>
            <input
              type="text"
              placeholder={`${staff.firstName} ${staff.lastName}`}
              readOnly
            />
            <input type="text" placeholder={staff.phoneNumber} readOnly />
            <input type="text" placeholder={staff.dataOfBirth} readOnly />
            <input type="text" placeholder={staff.email} readOnly />
            <input type="text" placeholder={staff.gender}  readOnly
             />
            <input
              type="text"
              placeholder={staff.specialization}
              readOnly={!editable}
              //onChange={handleChange}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </form>

          <div className={styles.popupFormButton}>
            {!editable ? (
              <button className={styles.buttonOne} onClick={toggleEditMode}>
                Edit
              </button>
            ) : (
              <button
                className={styles.buttonOne}
                onClick={() => onEdit(staff.id)}
              >
                Save
              </button>
            )}
            <button
              className={styles.buttonTwo}
              onClick={() => onDelete(staff.id)}
            >
              Delete
            </button>{" "}
          </div>
        </div>
      </Col>

      <Col md={8}>
        <div className={styles.appointmentDiv}>
          <div className={styles.appointmentData}>
            <span>Appointments</span>
            <div className={styles.calendar}>
              <div className={styles.week}>
                <span className={styles.text1}>Monday</span>
                <span className={styles.text2}>05 Nov, 2024</span>
              </div>
              <CiCalendar className={styles.calIcon} />
            </div>
          </div>

          <div className={styles.popupMainData}>
            {paperTwoData.map((data) => (
              <Paper key={data.id} className={styles.paperTwo}>
                <div className={styles.flex}>
                  <img src={data.imgsrc} alt=""></img>
                  <div className={styles.content}>
                    <span className={styles.title}>{data.t1}</span>
                    <span className={styles.same}>{data.t2}</span>
                    <div className={styles.time}>
                      <span className={styles.tspan}>{data.t3}</span>
                      <span className={styles.tspan}>{data.t4}</span>
                      <span className={styles.tspan}>{data.t5}</span>
                    </div>
                  </div>
                </div>
                <span>{data.t6}</span>
              </Paper>
            ))}
          </div>
        </div>
      </Col>
    </div>
  );
}

export default ViewAllAddService;
