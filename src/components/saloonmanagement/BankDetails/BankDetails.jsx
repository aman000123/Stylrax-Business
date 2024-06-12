import styles from "../BankDetails/BankDetails.module.css";
import { Field, Formik, Form } from "formik";
import Image from "../../../ux/Image.jsx";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
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
              placeholder="Aman"
              name="accName"
              value={details.accountHolderName}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}> Bank Name</label>
            <br />
            <Field
              type="text"
              placeholder="BOI"
              name="bankName"
              value={details.bankName}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}> IFSC Code</label>
            <br />
            <Field
              type="text"
              placeholder="HDFC0001234"
              name="ifscCode"
              value={details.ifscCode}
              className={styles.ifscCode}
            />
            <br />

            <label className={styles.lab}>
              Passbook/Cancelled Cheque
              <br />
              <div>
                <Zoom>
                <Image
                  alt="Default Profile"
                  className={styles.documents}
                  imageUrl={details.documentImageUrl}
                />
                </Zoom>
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
