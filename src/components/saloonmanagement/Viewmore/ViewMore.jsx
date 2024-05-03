import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import {
  getSalonSingleService,
  removeService,
  serviceEdit,
} from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import servicesimg from "../../../assets/image/servicesimg.png";
import styles from "../ManageStaff/ManageStaff.module.css";
import { RxCross2 } from "react-icons/rx";
import Session from "../../../service/session.js";
import { viewMoreSchema } from "../../../utils/schema.js";

function ViewMore({ onClose, id }) {
  const [service, setService] = useState({});
  const [editable, setEditable] = useState(false);
  const salonId = Session.get("salonId");

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await getSalonSingleService(salonId, id);
        const service = res.data;
        setService(service);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    getService();
  }, [id, salonId]);

  const handleClose = () => {
    onClose();
  };

  const toggleEditMode = () => {
    setEditable(!editable);
  };

  const onDelete = async () => {
    try {
      await removeService(salonId, id);
      Notify.success("Record Deleted!");
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const onServiceEdit = async (values) => {
    try {
      await serviceEdit(salonId, id, values);
      Notify.success("Service Updated Successfully");
      toggleEditMode();
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <Col md={4}>
      <div className={styles.popupFormDiv}>
        <div className={styles.popupFormImgDiv}>
          <span>Service</span>
          <div onClick={handleClose} className={styles.crossIcon}>
            <RxCross2 />
          </div>
          <img src={servicesimg} alt="" />
        </div>

        <Formik
          initialValues={{
            categoryId: service.categoryId,
            serviceDuration: service.serviceDuration,
            serviceName: service.serviceName,
            servicePrice: service.servicePrice,
            type: service.type,
          }}
          enableReinitialize={true}
          validationSchema={viewMoreSchema}
          //onSubmit={onServiceEdit}
          onSubmit={(values, actions) => {}}
        >
          {({ values }) => (
            <Form className={styles.popupForm}>
              <Field
                type="text"
                placeholder={!editable ? service.categoryId : "Category ID"}
                name="categoryId"
                disabled={!editable}
              />
              <Field
                type="text"
                placeholder={!editable ? service.serviceName : "Service Name"}
                name="serviceName"
                disabled={!editable}
                style={{
                  color: editable ? '#000' : '#888', 
                   borderColor: editable ? '#000' : '#ddd' 
                }}
              />
              <Field
                type="text"
                placeholder={!editable ? service.servicePrice : "Service Price"}
                name="servicePrice"
                disabled={!editable}
              />
              <Field
                type="text"
                placeholder={
                  !editable ? service.serviceDuration : "Service Duration"
                }
                name="serviceDuration"
                disabled={!editable}
              />

              <Field
                type="text"
                placeholder={!editable ? service.type : "Type"}
                name="type"
                disabled={!editable}
                style={{
                  color: editable ? '#000' : '#888', 
                   borderColor: editable ? '#000' : '#ddd' 
                }}
              />
              <div className={styles.popupFormButton}>
                {!editable ? (
                  <button className={styles.buttonOne} onClick={toggleEditMode}>
                    Edit
                  </button>
                ) : (
                  <button
                    className={styles.buttonOne}
                    type="submit"
                    onClick={() => onServiceEdit(values)}
                  >
                    Save
                  </button>
                )}
                <button
                  className={styles.buttonTwo}
                  type="button"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Col>
  );
}

export default ViewMore;
