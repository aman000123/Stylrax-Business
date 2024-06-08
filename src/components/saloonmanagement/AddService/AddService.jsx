import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addSalonService } from "../../../api/salon.management";
import { addServiceSchema } from "../../../utils/schema";
import Notify from "../../../utils/notify";
import Session from "../../../service/session";
import styles from "../AddService/AddService.module.css";

function AddService({ onClose, updatedData, id }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    id ? String(id) : ""
  );
  const [servicePrice, setServicePrice] = useState("");
  const handleServicePriceChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, "");
    setServicePrice(value ? ` ₹ ${value}` : "");
  };

  const handleOnSubmit = async (values) => {
    const salonId = Session.get("salonId");

    try {
      const { serviceName, serviceDuration, type } = values;
      const price = servicePrice.replace(/[^\d.]/g, "");
      const data = {
        categoryId: parseInt(selectedCategoryId),
        serviceName,
        servicePrice: parseFloat(price),
        serviceDuration: parseInt(serviceDuration),
        type,
      };

      console.log("Selected Category ID:", selectedCategoryId);
      const res = await addSalonService(salonId, data);
      Notify.success("Service added");
      onClose();
      updatedData();
    } catch (error) {
      Notify.error(error.message);
    }
  };


  return (
    <div className={styles.mainDiv}>
      <div className={styles.secDiv}>
        <Formik
          initialValues={{
            categoryId: selectedCategoryId,
            serviceName: "",
            servicePrice: "",
            serviceDuration: "",
            type: "",
          }}
          validationSchema={addServiceSchema}
          onSubmit={handleOnSubmit}
        >
          <Form className={styles.form} noValidate>
            <span>Add Services</span>
            <br />
            <Field
              type="text"
              placeholder="Enter service category"
              name="categoryId"
              className={styles.input5}
              value={selectedCategoryId}
             // onChange={handleCategoryChange}
            />
            <br />
            <ErrorMessage
              name="categoryId"
              component="div"
              className={styles.error}
            />
            <Field
              type="text"
              placeholder="Enter service name"
              name="serviceName"
              className={styles.input5}
              inputMode="text"
              onKeyPress={(event) => {
                const charCode = event.charCode;
                // Allow only letters (a-z, A-Z)
                if (!/^[a-zA-Z]+$/.test(String.fromCharCode(charCode))) {
                  event.preventDefault();
                }
              }}
            />

            <br />
            <ErrorMessage
              name="serviceName"
              component="div"
              className={styles.error}
            />
            <Field
              type="text"
              placeholder="Enter service price"
              name="servicePrice"
              className={styles.input5}
              value={servicePrice}
              onChange={handleServicePriceChange}
            />
            <br />
            <ErrorMessage
              name="servicePrice"
              component="div"
              className={styles.error}
            />
            {/* <Field
              type="text"
              placeholder="Service Duration (mins)"
              name="serviceDuration"
              className={styles.input6}
            /> */}
            <Field as="select" name="serviceDuration" className={styles.input6}>
              <option value="">Select Service Duration</option>
              {[...Array(12).keys()].map((i) => (
                <option key={i} value={(i + 1) * 5}>
                  {(i + 1) * 5} mins
                </option>
              ))}
              {[...Array(5).keys()].map((i) => (
                <option key={i} value={(i + 1) * 15 + 60}>
                  {Math.floor(((i + 1) * 15 + 60) / 60)} hr{" "}
                  {((i + 1) * 15 + 60) % 60} mins
                </option>
              ))}
            </Field>
            <br />
            <ErrorMessage
              name="serviceDuration"
              component="div"
              className={styles.error}
            />
            <Field as="select" name="type" className={styles.gender}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Both</option>
            </Field>
            <br />
            <ErrorMessage
              name="type"
              component="div"
              className={styles.error}
            />
            <button className={styles.button} type="submit">
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddService;
