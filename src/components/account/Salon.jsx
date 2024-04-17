import { Container } from "react-bootstrap";
import { Form, Formik } from "formik";
import { businessDetailsSchema } from "../../utils/schema";
import Section from "../../ux/Section";
import { createSalon } from "../../api/salon.api";
import { handleOnFileSelect } from "./FileUploader";
import styles from "./account.module.css";
import Notify from "../../utils/notify";
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
  serviceType: "",
  city: "",
  state: "",
  address: "",
  panNumber: "",
 // mainGateUrl: "",
 // panUrl: "",
  //galleryImageUrl: "",

};

const BusinessDetails = ({onContinue}) => {

  const handleOnSubmit = async (values) => {
    //onContinue(values);
    try {
      const verifyForm = {
        // name: values.name,
        // email: values.email,
        // gstNumber: values.gst,
        // companyName: values.companyName,
        // address:"Delhi",
        // latitude:"332.343",
        // longitude:"23.343",
        // city:"Delhi",
        // state:"Delhi",
        // pinCode: values.pinCode,
        // serviceType: values.serviceType,
        // homeService:false,
        // panNumber:values.panNumber,
        // mainGateUrl:values.mainGateUrl,
        // galleryImageUrl: values.galleryImageUrl,
        // panUrl: values.panUrl,
                name:values.name,
                email:values.email,
                gstNumber:values.gst,
                companyName: values.companyName,
                address:values.address,
                latitude:"332.343",
                longitude:"23.343",
                city:values.city,
                state:values.state,
                pincode:values.pinCode,
                serviceType:values.serviceType,
                homeService:false,
                mainGateImageUrl:"maingateImageUrl",
                bannerImages:["url1","url2"],
                gallaryImages:["gi_url1","gi_url2"]
       
      };
      const res = await createSalon(verifyForm);
      const salonId = res.data.id;
       console.log("salon id:::>", salonId);
       onContinue(values,salonId);
    } catch (error) {
      Notify.error(error.message);
    }
  }

  return (
    <Container>
      <Section className="d-flex flex-column align-items-center">
      <FormContainer>
                    <Formik
                        initialValues={initialValues}
                         validationSchema={businessDetailsSchema}
                        onSubmit={handleOnSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form className="d-flex flex-column">
                            <InputText type="text" name="name" label="Name" placeholder="Name" />
                            <InputText type="email" name="email" label="Email" placeholder="Samplemail.com" />
                            <InputText type="text" name="gst" label="GST Number" placeholder="GST Number" />
                            <InputText type="text" name="companyName" label="Company Name" placeholder="Company Name" />
                            <InputText type="text" name="panNumber" label="Pan Number" placeholder="Pan Number" />
                            <TextArea rows="5" name="address" label="Salon Address" placeholder="Salon Address" className={styles.address}/>
                            <InputSelect name="city" label="Salon City" options={cityOptions} />
                            <InputSelect name="state" label="Salon State" options={stateOptions} />
                            <InputText type="text" name="pinCode" label="Pin Code" placeholder="Pin Code" />
                            <InputSelect name="serviceType" label="Service For" options={serviceOptions} />
                            <Section className="d-flex flex-column align-items-start">
                            <InputFile name="panUrl" label="Pan Card" onFileSelect={(file) => handleOnFileSelect(file, 'panUrl', setFieldValue)} />                            </Section>
                            <Section className="d-flex flex-column align-items-start mb-4">
                                <Label text="Salon Images" />
                                <InputFile name="mainGateUrl" helperText="Main Gate" onFileSelect={(e)=>handleOnFileSelect(e,"mainGateUrl", setFieldValue)} />
                                <InputFile name="galleryImageUrl" helperText="Gallery" onFileSelect={(e)=> handleOnFileSelect(e, "galleryImageUrl", setFieldValue)} />
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
