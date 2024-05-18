import styles from "../BankDetails/BankDetails.module.css";
import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import Notify from "../../../utils/notify.js";
import Session from "../../../service/session.js";
import { singleSalon } from "../../../api/salon.api.js";
import Image from "../../../ux/Image.jsx";

function BankDetails() {
  const salonId = Session.get("salonId");
  console.log("bank details::>", salonId);

  const [bankDetails, setBankDetails] = useState([]);
  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const bankDetails = response.data.bankDetail;
        console.log("bank details::>", bankDetails);
        setBankDetails(bankDetails);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
  }, [salonId]);

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
              value={bankDetails.accountNumber}
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
              value={bankDetails.accountHolderName}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}> Bank Name</label>
            <br />
            <Field
              type="text"
              placeholder="Jhon"
              name="bankName"
              value={bankDetails.bankName}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}> IFSC Code</label>
            <br />
            <Field
              type="text"
              placeholder="Jhon"
              name="ifscCode"
              value={bankDetails.ifscCode}
              className={styles.inputs}
            />
            <br />

            <label className={styles.lab}>
              Passbook/Cancelled Cheque
              <br />
              <div>
                {bankDetails.documentImageUrl &&
                bankDetails.documentImageUrl.startsWith("http") ? (
                  <img
                    src={bankDetails.documentImageUrl}
                    className={styles.documents}
                    alt="Profile"
                  />
                ) : (
                  <Image alt="Default Profile" className={styles.imgDiv} />
                )}
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
