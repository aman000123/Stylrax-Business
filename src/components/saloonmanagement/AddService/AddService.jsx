import styles from "../AddService/AddService.module.css";
import addservicesimg from "../../../assets/image/addservicesimg.png";
import { addSalonService } from "../../../api/salon.management";
import { Form, Formik, Field, ErrorMessage } from "formik";
import {  InputSelect} from "../../../ux/controls";

import Notify from "../../../utils/notify";
import { addServiceSchema } from "../../../utils/schema";
import Session from "../../../service/session";
function AddService() {
  const genderOptions = [
    { value: "", text: "Select" },
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
    { value: "other", text: "Other" },
  ];
  const initialValues = {
    serviceName: "",
    servicePrice: "",
    serviceDuration: "",
    type: "",
  };


  const handleOnSubmit = async (values) => {
    const salonId = Session.get("salonId");
    console.log("salonID:::>", salonId);

    const { serviceName, servicePrice, serviceDuration, type } = values;

    try {
      const data = {
        categoryId: 11,
        serviceName: serviceName,
        servicePrice: parseFloat(servicePrice),
        serviceDuration: parseInt(serviceDuration),
        type: type,
      };
      const res = await addSalonService(data,salonId);

      console.log("response:::>", res);
      Notify.success("Service added");
    } catch (error) {
      Notify.error(error.message);
    }
  };
 
  return (
    <div className={styles.mainDiv}>
      <div className={styles.secDiv}>
        <Formik
          initialValues={initialValues}
          validationSchema={addServiceSchema}
          onSubmit={handleOnSubmit}
        >
          <Form className={styles.form} noValidate>
            <span>Add Services</span>
            <br />

            <Field
              type="text"
              placeholder="Service Name"
              name="serviceName"
              className={styles.input4}
            />
            <ErrorMessage name="serviceName" component="div" className={styles.error}/>
            <Field
              type="text"
              placeholder="Service Mrp"
              name="servicePrice"
              className={styles.input5}
            />
            <br />
            <ErrorMessage name="servicePrice" component="div" className={styles.error}/>
            <Field
              type="text"
              placeholder="Service Duration"
              name="serviceDuration"
              className={styles.input6}
            />
            <br />
            <ErrorMessage name="serviceDuration" component="div"className={styles.error} />
            <Field
              type="text"
              placeholder="type"
              name="type"
              className={styles.input6}
            /> 
            {/* <InputSelect name="gender"  options={genderOptions} /> */}
                
            <br />
            <ErrorMessage name="type" component="div" className={styles.error}/>
            <button className={styles.button} type="submit">
              Add
            </button>
          </Form>
        </Formik>
      </div>

      <div className={styles.secDiv}>
        <img src={addservicesimg} alt=""></img>
        <div className={styles.uploadBtn}>
          <span>Service Image</span>
          <button>Upload</button>
        </div>
        <span className={styles.about}></span>
      </div>
    </div>
  );
}

export default AddService;
