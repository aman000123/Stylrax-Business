import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import styles from "../ManageStaff/ManageStaff.module.css";
import {
  editStaff,
  getStaff,
  removeStaff,
} from "../../../api/salon.management";
import Notify from "../../../utils/notify";
import { RxCross2 } from "react-icons/rx";
import Session from "../../../service/session";
import Swal from "sweetalert2";

function ViewAllAddService({ id, onClose ,updatedData}) {
  const [staff, setStaff] = useState({});
  const [editable, setEditable] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [role, setRole] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing confirmation dialog
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

  const onDelete = async () => {
    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const onEdit = async () => {
    try {
      const editedData = {
        specialization: specialization,
        role: role,
      };
      await editStaff(salonId, staff.id, editedData);
      Notify.success("Record updated");
      onClose();
      updatedData();
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

  const handleDeleteConfirmation = async () => {
    try {
      await removeStaff(salonId, staff.id);
      Notify.success("Staff deleted");
      onClose();
      updatedData();
    } catch (error) {
      Notify.error(error.message);
    }
    setShowConfirmation(false);
  };

  return (
    <div className={styles.popup}>
      <Col md={4}>
        <div className={styles.popupFormDiv}>
          <div className={styles.popupFormImgDiv}>
            <span>Staff</span>
            <div className={styles.crossIcon} onClick={handleClose}>
              <RxCross2 />
            </div>
            <img
              src={staff.profileImageUrl}
              alt=""
              className={styles.profile}
            />
          </div>

          <form className={styles.popupForm}>
            <input type="text" placeholder={`${staff.firstName}`} readOnly />
            <input type="text" placeholder={staff.phoneNumber} readOnly />
            <input type="text" placeholder={staff.dataOfBirth} readOnly />
            <input type="text" placeholder={staff.email} readOnly />
            <input type="text" placeholder={staff.gender} readOnly />
            <input
              type="text"
              placeholder={!editable ? staff.specialization : "Specilization"}
              readOnly={!editable}
              style={{
                // color: editable ? "#000" : "#888",
                 borderColor: editable ? "#000" : "#888",
              }}
              onChange={(e) => setSpecialization(e.target.value)}
            />
            <input
              type="text"
              disabled={!editable}
              placeholder={!editable ? staff.role : "Role"}
            // value={editable ? role : staff.role || ""}
              readOnly={!editable}
              style={{
                color: editable ? "#000" : "#000",
                borderColor: editable ? "#000" : "#888",
              }}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className={`${styles.adhar_images} row`}>
              <div className="col">
                <div>Adhar Front</div>
                <img
                  src={staff.aadharFrontUrl}
                  alt="adhar front"
                  className="mb-3"
                />
              </div>
              <div className="col">
                <div>Adhar Back</div>

                <img src={staff.aadharBackUrl} alt="adhar back"/>
              </div>
            </div>
          </form>

          <div className={styles.popupFormButton}>
            {!editable ? (
              <button className={styles.buttonOne} onClick={toggleEditMode}>
                Edit
              </button>
            ) : (
              <button className={styles.buttonOne} onClick={onEdit}>
                Save
              </button>
            )}
            <button className={styles.buttonTwo} onClick={onDelete}>
              Delete
            </button>{" "}
          </div>
        </div>
      </Col>

      {/* SweetAlert2 Confirmation Dialog */}
      {showConfirmation && (
        <ConfirmationDialog
          onClose={handleClose}
          onConfirm={handleDeleteConfirmation}
        />
      )}
    </div>
  );
}

function ConfirmationDialog({ onClose, onConfirm }) {
  useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this staff member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else {
        onClose();
      }
    });
  }, [onClose, onConfirm]);

  return null;
}

export default ViewAllAddService;
