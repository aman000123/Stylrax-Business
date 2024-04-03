import {Container} from "react-bootstrap";
import { Form, Formik } from "formik";
import styles from "./account.module.css";
import { InputText, InputFile, Label, Button } from "../../ux/controls";
import {bankDetailsSchema} from "../../utils/schema";
import Section from "../../ux/Section";
import FormContainer from "./FormContainer";

const initialValues = {
  accountNumber:"",
  accountHolderName:"",
  bankName:"",
  ifscCode:"",
}


const BankDetails = ({onContinue}) => {

  const handleOnSubmit = async (values) => {
    onContinue(values);
  }
 
return (
  <Container>
  <Section className="d-flex flex-column align-items-center">
            <FormContainer>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form className="d-flex flex-column">
                        <InputText type="text" name="accountNumber" label="Account Number" placeholder="Account Number" />
                        <InputText type="text" name="accountHolderName" label="Account Holder Name" placeholder="Account Holder Name" />
                        <InputText type="text" name="bankName" label="Bank Name" placeholder="Bank Name" />

                        <InputText type="text" name="ifscCode" label="IFSC Code" placeholder="IFSC Code" />
                      
                        <Section className="d-flex flex-column align-items-start mb-4">
                            <Label text="Passbook/Cancel Cheque" />
                            <InputFile name="bankDocumentUrl" onFileSelect={(e)=>handleOnFileSelect(e,"bankDocumentUrl", setFieldValue)} />
                        </Section>
                        <Section className="d-flex flex-column align-items-center">
                            <Button type="submit" className={styles.registration__submit_button}>
                                Finish
                            </Button>
                        </Section>
                    </Form>
                    )}
                </Formik>
            </FormContainer>
        </Section>
</Container>
  );
}

export default BankDetails;
