import {Container} from "react-bootstrap";
import { Form, Formik } from "formik";
import styles from "./account.module.css";
import { InputText, InputFile, Label, Button } from "../../ux/controls";
import {bankDetailsSchema} from "../../utils/schema";
import Section from "../../ux/Section";
import FormContainer from "./FormContainer";
import Notify from "../../utils/notify";
import { handleOnFileSelect } from "./FileUploader";
import { bankDetails } from "../../api/account.api";
import { useSelector } from "react-redux";

const initialValues = {
  accountNumber:"",
  accountHolderName:"",
  bankName:"",
  ifscCode:"",
  documentImageUrl:"",
}


const BankDetails = ({salonId,onContinue}) => {
  // console.log("bank id:::>", salonId);



const salons = useSelector((state) => state.auth.salons);

const salonIdd = salons[0]?.id ?? null;

// console.log("salonID:::>", salonIdd);
 
   const handleOnSubmit = async (values) => {
     try {
  
      const data ={
        accountNumber:values.accountNumber,
        accountHolderName:values.accountHolderName,
        bankName:values.bankName,
        ifscCode:values.ifscCode,
        documentImageUrl:values.documentImageUrl,
      }
      //const response = await bankDetails(salonId,data);

      //const res = await bankDetails(salonIdd,data);
      const response = await bankDetails(salonId ? salonId : salonIdd, data);
      // console.log("response:::>", response);
      onContinue(values);
    } catch (error) {
      Notify.error(error.message);
      // console.log("error:::>", error);

    }
  }
 
return (
  <Container>
  <Section className="d-flex flex-column align-items-center">
            <FormContainer>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                    // validationSchema={bankDetailsSchema}
                >
                    {({ setFieldValue }) => (
                        <Form className="d-flex flex-column">
                        <InputText type="text" name="accountNumber" label="Account Number" placeholder="Enter account number" />
                        <InputText type="text" name="accountHolderName" label="Account Holder's Name" placeholder="Enter account holder's name" />
                        <InputText type="text" name="bankName" label="Bank Name" placeholder="Enter bank name" />

                        <InputText type="text" name="ifscCode" label="IFSC Code" placeholder="Enter IFSC code" />
                      
                        <Section className="d-flex flex-column align-items-start mb-4">
                            <Label text="Passbook/Cancelled Cheque" />
                            <InputFile name="documentImageUrl" onFileSelect={(e)=>handleOnFileSelect(e,"documentImageUrl", setFieldValue)} />
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