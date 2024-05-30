import { Container } from "react-bootstrap";
import { Form, Formik } from "formik";
import styles from "../../account/account.module.css";
import { InputText, InputFile, Label, Button } from "../../../ux/controls";
import Section from "../../../ux/Section";
import Notify from "../../../utils/notify";
import { useSelector } from "react-redux";
import { bankDetailsSchema } from "../../../utils/schema";
import FormContainer from "../../account/FormContainer";
import { handleOnFileSelect } from "../../account/FileUploader";
import { bankDetails } from "../../../api/account.api";
import { useNavigate } from "react-router-dom";


const initialValues = {
  accountNumber: "",
  accountHolderName: "",
  bankName: "",
  ifscCode: "",
  bankDocumentUrl: "",
};

const SalonBank = ({ salonId}) => {

  console.log("bank id:::>", salonId);
  const navigate = useNavigate();
  const salons = useSelector((state) => state.auth.salons);
  const salonIdd = salons[0]?.id ?? null;
  const handleOnSubmit = async (values) => {
    try {
      const data = {
        accountNumber: values.accountNumber,
        accountHolderName: values.accountHolderName,
        bankName: values.bankName,
        ifscCode: values.ifscCode,
        //bankDocumentUrl:values.bankDocumentUrl,
      };

      const response = await bankDetails(salonId ? salonId : salonIdd, data);
      Notify.success(response.data.message);
      navigate('/salon/dashboard')
    } catch (error) {
      Notify.error(error.message);
      console.log("error:::>", error);
    }
  };

  return (
    <Container>
      <Section className="d-flex flex-column align-items-center pt-5 mt-3">
        <FormContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={bankDetailsSchema}
          >
            {({ setFieldValue }) => (
              <Form className="d-flex flex-column">
                <InputText
                  type="text"
                  name="accountNumber"
                  label="Account Number"
                  placeholder="Account Number"
                />
                <InputText
                  type="text"
                  name="accountHolderName"
                  label="Account Holder's Name"
                  placeholder="Account Holder's Name"
                />
                <InputText
                  type="text"
                  name="bankName"
                  label="Bank Name"
                  placeholder="Bank Name"
                />

                <InputText
                  type="text"
                  name="ifscCode"
                  label="IFSC Code"
                  placeholder="IFSC Code"
                />

                <Section className="d-flex flex-column align-items-start mb-4">
                  <Label text="Passbook/Cancelled Cheque" />
                  <InputFile
                    name="bankDocumentUrl"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "bankDocumentUrl", setFieldValue)
                    }
                  />
                </Section>
                <Section className="d-flex flex-column align-items-center">
                  <Button
                    type="submit"
                    className={styles.registration__submit_button}
                  >
                    Continue
                  </Button>
                </Section>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Section>
    </Container>

  );
};

export default SalonBank;
