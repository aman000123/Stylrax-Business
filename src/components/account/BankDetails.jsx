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
import Session from "../../service/session";
import { useSelector } from "react-redux";
import { useState } from "react";

const initialValues = {
  accountNumber:"",
  accountHolderName:"",
  bankName:"",
  ifscCode:"",
  bankDocumentUrl:"",
}


const BankDetails = ({salonId,onContinue}) => {
  console.log("bank id:::>", salonId);



const salons = useSelector((state) => state.auth.salons);

const salonIdd = salons[0]?.id ?? null;

console.log("salonID:::>", salonIdd);
 
   const handleOnSubmit = async (values) => {
     try {
  
      const data ={
        accountNumber:values.accountNumber,
        accountHolderName:values.accountHolderName,
        bankName:values.bankName,
        ifscCode:values.ifscCode,
        //bankDocumentUrl:values.bankDocumentUrl,
      }
      //const response = await bankDetails(salonId,data);

      //const res = await bankDetails(salonIdd,data);
      const response = await bankDetails(salonId ? salonId : salonIdd, data);
      console.log("response:::>", response);
      onContinue(values);
    } catch (error) {
      Notify.error(error.message);
      console.log("error:::>", error);

    }
  }
 
return (
  <Container>
  <Section className="d-flex flex-column align-items-center">
            <FormContainer>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                    validationSchema={bankDetailsSchema}
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