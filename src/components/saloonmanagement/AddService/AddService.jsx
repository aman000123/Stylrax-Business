import styles from "../AddService/AddService.module.css";
import addservicesimg from "../../../assets/image/addservicesimg.png";
import { addSalonService } from "../../../api/salon.management";
import { addServiceSchema } from "../../../utils/schema";
import { ErrorMessage, Form, Formik,Field} from "formik";
import Notify from "../../../utils/notify"
function AddService() {
    const initialValues = {
        serviceName:"",
        servicePrice:"",
      
      }
    //add salon service
    const handleOnSubmit = async (values) => {
      const {serviceName,servicePrice} = values;
      console.log(`serviceName::>${serviceName} servicePrice ::>${servicePrice}`)
        try {
          const data ={
            categoryId:11,
            serviceName:serviceName,
            servicePrice:servicePrice,
            serviceDuration:50,
            type:"Men",

            // categoryId:11,
            // serviceName:serviceName,
            // servicePrice:servicePrice,
            // serviceDuration:50,
            // type:"Men"
          }
          const res = await addSalonService(data);
          console.log("response:::>", res);
          Notify.success("service added");
          //onContinue(values);
        } catch (error) {
          Notify.error(error.message);
        }
      }
  return (
    <div className={styles.mainDiv}>
        <div className={styles.secDiv}>
          <Formik
          initialValues={initialValues}
         // validationSchema={addServiceSchema}
          onSubmit={handleOnSubmit}
          >
             <Form className={styles.form}>
                <span>Add Services</span><br/>

                <select name='mystate' id="state" className={styles.input1}>
                    <option value="up" className={styles.options}>Male</option>
                    <option value="mp" className={styles.options}>Female</option>
                    <option value="cg" className={styles.options}>Others</option>
                </select><br />

                <select name='mystate' id="state" className={styles.input2}>
                    <option value="up" className={styles.options}>Service Availiability</option>
                    <option value="mp" className={styles.options}>Service Availiability</option>
                    <option value="cg" className={styles.options}>Service Availiability</option>
                </select><br />

                <select name='mystate' id="state" className={styles.input3}>
                    <option value="up" className={styles.options}>Select Category</option>
                    <option value="mp" className={styles.options}>Select Category</option>
                    <option value="cg" className={styles.options}>Select Category</option>
                </select><br />


                <span className={styles.spanOne}>Service Details</span><br/>

                    < Field type='text' placeholder='Service Name'name="serviceName" className={styles.input4}  />
                    <ErrorMessage  name="serviceName" component="div"/>
                    <Field type='text' placeholder='Service Mrp' name="servicePrice"   
                               className={styles.input5}/><br/>
                    <ErrorMessage  name="servicePrice" component="div"/>
                    <Field type='text' placeholder='Offer Price'name="offerPrice"className={styles.input6}/><br/>
                    {/* <ErrorMessage  name="serviceName" component="div"/> */}
                    <button className={styles.button} type="submit">Add</button>    
                    
            </Form>
            
            </Formik>
        </div>

        <div className={styles.secDiv}>
            <img src={addservicesimg} alt=''></img>
            <div className={styles.uploadBtn}>
                <span>Service Image</span>
                <button>Upload</button>
            </div>
            <span className={styles.about} ></span>
        </div>
    </div>
  )
}

export default AddService
