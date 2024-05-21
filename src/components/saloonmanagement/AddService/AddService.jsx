import  { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addSalonService, serviceCategory } from "../../../api/salon.management";
import { addServiceSchema } from "../../../utils/schema";
import Notify from "../../../utils/notify";
import Session from "../../../service/session";
import styles from "../AddService/AddService.module.css";

function AddService({ onClose,updatedData }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // State to store selected category name
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await serviceCategory();
        setCategories(res.data);
        Notify.success(res.data.message);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleOnSubmit = async (values) => {
    const salonId = Session.get("salonId");

    try {
      const { serviceName, servicePrice, serviceDuration, type } = values;
      const data = {
        categoryId: parseInt(selectedCategoryId),
        serviceName,
        servicePrice: parseFloat(servicePrice),
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

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategoryName = event.target.options[event.target.selectedIndex].text; // Get selected category name
    console.log("Selected Category ID:", selectedCategoryId);
    console.log("Selected Category Name:", selectedCategoryName);
    setSelectedCategoryId(selectedCategoryId);
    setSelectedCategoryName(selectedCategoryName); // Update selected category name
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.secDiv}>
        <Formik
          initialValues={{
            categoryId: "",
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
              as="select"
              name="categoryId"
              className={styles.categoryField}
              onChange={handleCategoryChange}
              value={selectedCategoryId} 
            >
              <option value="">Select Service</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Field>
            <br/>
            <ErrorMessage name="categoryId" component="div" className={styles.error} />
            <Field
              type="text"
              placeholder="Service Name"
              name="serviceName"
              className={styles.input5}
            />
            <br/>
            <ErrorMessage name="serviceName" component="div" className={styles.error} />
          
            <Field
              type="text"
              placeholder="Service Mrp"
              name="servicePrice"
              className={styles.input5}
            />
            <br />
            <ErrorMessage name="servicePrice" component="div" className={styles.error} />
            <Field
              type="text"
              placeholder="Service Duration (mins)"
              name="serviceDuration"
              className={styles.input6}
            />
            <br />
            <ErrorMessage name="serviceDuration" component="div" className={styles.error} />
            <Field as="select" name="type" className={styles.gender}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Both</option>
            </Field>
            <br />
            <ErrorMessage name="type" component="div" className={styles.error} />
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
