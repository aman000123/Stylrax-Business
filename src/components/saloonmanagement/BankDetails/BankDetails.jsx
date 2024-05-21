import styles from "../BankDetails/BankDetails.module.css";
import { Field, Formik, Form } from "formik";
import Image from "../../../ux/Image.jsx";

function BankDetails({ salonDetails }) {
  const details = salonDetails.bankDetail || {};

  return (
    <div className={styles.mainDiv}>
      <div>
        <Formik>
          <Form>
            <label className={styles.lab}> Account Number</label>
            <br />
            <Field
              type="text"
              placeholder="85651248769654"
              value={details.accountNumber}
              name="accNum"
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}>Account Holder's Name</label>
            <br />
            <Field
              type="text"
              placeholder="Jhon"
              name="accName"
              value={details.accountHolderName}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}> Bank Name</label>
            <br />
            <Field
              type="text"
              placeholder="Jhon"
              name="bankName"
              value={details.bankName}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}> IFSC Code</label>
            <br />
            <Field
              type="text"
              placeholder="Jhon"
              name="ifscCode"
              value={details.ifscCode}
              className={styles.ifscCode}
            />
            <br />

            <label className={styles.lab}>
              Passbook/Cancelled Cheque
              <br />
              <div>
                <Image
                  alt="Default Profile"
                  className={styles.documents}
                  imageUrl={details.documentImageUrl}
                />
              </div>
            </label>
            <br />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default BankDetails;
