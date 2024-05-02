import React, { useEffect, useState } from "react";
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
import Notify from "../../../utils/notify";
import { RxCross2 } from "react-icons/rx";
import Session from "../../../service/session";

function ViewAllAddService({ id, onClose }) {
  const [staff, setStaff] = useState({});
  const [editable, setEditable] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const salonId = Session.get("salonId");

  useEffect(() => {
    const getSalonStaff = async () => {
      try {
        const res = await getStaff(salonId, id);
        const staff = res.data;
        setStaff(staff);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    getSalonStaff();
  }, [salonId, id]);

  const onDelete = async (id) => {
    try {
      await removeStaff(salonId, id);
      Notify.success("Staff deleted");
      onClose()
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const onEdit = async (id) => {
    try {
      const updatedData = {
        specialization: specialization,
        role: "Staff"
      };
      await editStaff(salonId, staff.id, updatedData);
      Notify.success("Record updated");
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleClose = () => {
 
      onClose();
    
  };

  const toggleEditMode = () => {
    setEditable(!editable);
  };

  return (
    <div className={styles.popup} >
               
      <Col md={4}>
        <div className={styles.popupFormDiv}>
          <div className={styles.popupFormImgDiv}>
            <span>Staff</span>
            <div className={styles.crossIcon}onClick={handleClose}><RxCross2/></div>  
            <img src={staff.profileImageUrl} alt="" className={styles.profile}/>
          </div>

          <form className={styles.popupForm}>
            <input
              type="text"
              placeholder={`${staff.firstName}`}
              readOnly
            />
            <input type="text" placeholder={staff.phoneNumber} readOnly />
            <input type="text" placeholder={staff.dataOfBirth} readOnly />
            <input type="text" placeholder={staff.email} readOnly />
            <input type="text" placeholder={staff.gender} readOnly />
            <input
              type="text"
              placeholder={staff.specialization}
              readOnly={!editable}
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
    </div>
  );
}

export default ViewAllAddService;
