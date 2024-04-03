import { Container } from "react-bootstrap";
import { Form, Formik } from "formik";
import { businessDetailsSchema } from "../../utils/schema";
import Section from "../../ux/Section";
import styles from "./account.module.css";
import { InputText, InputSelect, InputFile, Label, Button, TextArea } from "../../ux/controls";
import FormContainer from "./FormContainer";

const stateOptions = [
  { value: "", text: "Select State" },
  { value: "Alabama", text: "Alabama" },
  { value: "Alaska", text: "Alaska" }
]

const cityOptions = [
  { value: "", text: "Select City" },
  { value: "Birmingham", text: "Birmingham" },
  { value: "Montgomery", text: "Montgomery" },
  { value: "Anchorage", text: "Anchorage" },
  { value: "Fairbanks", text: "Fairbanks" }
]

const serviceOptions = [
  { value: "", text: "Select Service" },
  { value: "Male", text: "Male" },
  { value: "Female", text: "Female" },
  { value: "Both", text: "Both" }
]

const initialValues = {
  name: "",
  email: "",
  gst: "",
  companyName: "",
  pinCode: "",
  gender: "",
  city: "",
  state: "",
  address: "",
  panNumber: "",
};

const BusinessDetails = ({onContinue}) => {

  const handleOnSubmit = async (values) => {
    onContinue(values);
  }

  return (
    <Container>
      <Section className="d-flex flex-column align-items-center">
      <FormContainer>
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={businessDetailsSchema}
                        onSubmit={handleOnSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form className="d-flex flex-column">
                            <InputText type="text" name="salonName" label="Name" placeholder="Name" />
                            <InputText type="email" name="email" label="Email" placeholder="Samplemail.com" />
                            <InputText type="text" name="gst" label="GST Number" placeholder="GST Number" />
                            <InputText type="text" name="companyName" label="Company Name" placeholder="Company Name" />
                            <InputText type="text" name="panNumber" label="Pan Number" placeholder="Pan Number" />
                            <TextArea raw="5" name="address" label="Salon Address" placeholder="Salon Address" />
                            <InputSelect name="city" label="Salon City" options={cityOptions} />
                            <InputSelect name="state" label="Salon State" options={stateOptions} />
                            <InputText type="text" name="pinCode" label="Pin Code" placeholder="Pin Code" />
                            <InputSelect name="serviceType" label="Service For" options={serviceOptions} />
                            <Section className="d-flex flex-column align-items-start">
                                <InputFile name="panUrl" label="Pan Card" onFileSelect={(e)=> handleOnFileSelect(e, "panUrl", setFieldValue)} />
                            </Section>
                            <Section className="d-flex flex-column align-items-start mb-4">
                                <Label text="Salon Images" />
                                <InputFile name="mainGateUrl" helperText="Main Gate" onFileSelect={(e)=>handleOnFileSelect(e,"aadharFrontUrl", setFieldValue)} />
                                <InputFile name="galleryImageUrl" helperText="Gallery" onFileSelect={(e)=> handleOnFileSelect(e, "aadharBackUrl", setFieldValue)} />
                            </Section>
                            <Section className="d-flex flex-column align-items-center">
                                <Button type="submit" className={styles.registration__submit_button}>
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

export default BusinessDetails;
