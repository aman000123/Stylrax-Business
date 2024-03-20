import styles from "../AddService/AddService.module.css";
import addservicesimg from "../../../assets/image/addservicesimg.png";

function AddService() {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.secDiv}>
            <form className={styles.form}>
                <span>Add Services</span><br/>

                <select name='mystate' id="state" className={styles.input1}>
                    <option value="up" className={styles.options}>Services For</option>
                    <option value="mp" className={styles.options}>Services For</option>
                    <option value="cg" className={styles.options}>Services For</option>
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

                    <input type='text' placeholder='Service Name' className={styles.input4}/><br/>
                    <input type='text' placeholder='Service Mrp'className={styles.input5}/><br/>
                    <input type='text' placeholder='Offer Price'className={styles.input6}/><br/>

                    <button className={styles.button}>Add</button>    
                    
            </form>
        </div>

        <div className={styles.secDiv}>
            <img src={addservicesimg} alt=''></img>
            <div className={styles.uploadBtn}>
                <span>Service Image</span>
                <button>Upload</button>
            </div>
            <span className={styles.about} >Lorem ispum dolar sit amet</span>
        </div>
    </div>
  )
}

export default AddService
