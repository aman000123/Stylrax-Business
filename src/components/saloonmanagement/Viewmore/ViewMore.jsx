//import styles from "../Viewmore/Viewmore.module.css";
import { Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { getSalonSingleService, removeService, serviceEdit } from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import stylistimg1 from "../../../assets/image/stylistimg1.png";
import styles from "../ManageStaff/ManageStaff.module.css";

import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Session from "../../../service/session.js";
import { viewMoreSchema } from "../../../utils/schema.js";

function ViewMore({ onClose, id }) {
  const [service, setService] = useState({});
  const [editable, setEditable] = useState(false);

  const salonId = Session.get("salonId");
  console.log("salonID:::>", salonId);
  console.log("salon service ID:::>", id);

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await getSalonSingleService(salonId, id);
        const service = res.data;
        setService(service);
        console.log("service data", service);
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

  //Delete service
  const onDelete = async () => {
    try {
      await removeService(salonId, id);
      Notify.success("Record Deleted!");
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  // Service Edit api
  const onServiceEdit = async (values) => {
    try {
      await serviceEdit(salonId, id, values);
      Notify.success("Service Updated Successfully");
      toggleEditMode(); // Exit edit mode after saving
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <>
      <Col md={4}>
        <div className={styles.popupFormDiv}>
          <div className={styles.popupFormImgDiv}>
            <span>Staff</span>
            <div onClick={handleClose} className={styles.crossIcon}><RxCross2 /></div>             
            <img src={stylistimg1} alt='' />
          </div>

          <Formik
            initialValues={{
              categoryId: service.categoryId || "",
              serviceDuration: service.serviceDuration || "",
              serviceName: service.serviceName || "",
              servicePrice: service.servicePrice || "",
              type: service.type || "",
            }}
            enableReinitialize={true}
            validationSchema={viewMoreSchema}
            onSubmit={async (values) => {
              onServiceEdit(values);
            }}
          >
            {({ values }) => (
              <Form className={styles.popupForm}>
                <Field type="text" placeholder={service.categoryId} name="category" disabled={!editable} />
                <Field type="text" placeholder={service.serviceDuration} name="serviceDuration" disabled={!editable} />
                <Field type="text" placeholder={service.serviceName} name="serviceName" disabled={!editable} />
                <Field type="text" placeholder={service.servicePrice} name="servicePrice" disabled={!editable} />
                <Field type="text" placeholder={service.type} name="type" disabled={!editable} />
                <div className={styles.popupFormButton}>
                  {!editable ? (
                    <button className={styles.buttonOne} onClick={toggleEditMode}>
                      Edit
                    </button>
                  ) : (
                    <button className={styles.buttonOne} type="submit" onClick={() => onServiceEdit(service.id)}>
                      Save
                    </button>
                  )}
                  <button className={styles.buttonTwo} type="button" onClick={onDelete}>Delete</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </>
  );
}

export default ViewMore;
