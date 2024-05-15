import { Container } from "react-bootstrap";
import { Form, Formik } from "formik";
import { businessDetailsSchema } from "../../utils/schema";
import Section from "../../ux/Section";
import { createSalon } from "../../api/salon.api";
import { handleOnFileSelect } from "./FileUploader";
import styles from "./account.module.css";
import Notify from "../../utils/notify";
import {
  InputText,
  InputSelect,
  InputFile,
  Label,
  Button,
  TextArea,
} from "../../ux/controls";
import FormContainer from "./FormContainer";
import { data } from "./Data";
import { useState } from "react";
import { getPresignedUrl } from "../../api/file.api";


const serviceOptions = [
  { value: "", text: "Select Service" },
  { value: "Male", text: "Male" },
  { value: "Female", text: "Female" },
  { value: "Both", text: "Both" },
];

const initialValues = {
  name: "",
  gst: "",
  companyName: "",
  pinCode: "",
  serviceType: "",
  city: "",
  state: "",
  address: "",
  panNumber: "",
  mainGateUrl: "",
  bannerImages: [],
  galleryImageUrl: [],
};

const BusinessDetails = ({ onContinue, token }) => {
  const [bannerImages, setBannerImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [cityOptions, setCityOptions] = useState([
    { value: "", text: "Select City" },
  ]);
  const states = Object.keys(data);

  const handleOnSubmit = async (values) => {
    //onContinue(values);
    try {
      const verifyForm = {
        name: values.name,
        email: values.email,
        gstNumber: values.gst,
        companyName: values.companyName,
        address: values.address,
        latitude: "332.343",
        longitude: "23.343",
        city: values.city,
        state: values.state,
        pincode: values.pinCode,
        serviceType: values.serviceType,
        homeService: false,

        mainGateImageUrl: values.mainGateUrl,
        bannerImages: bannerImages,
        gallaryImages: galleryImages,
      };
      const res = await createSalon(verifyForm);
      console.log("respn::>", res);
      const salonId = res.data.id;
      console.log("salon id:::>", salonId);
      onContinue(values, salonId);
    } catch (error) {
      Notify.error(error.message);
    }
  };
  const handleOnFile = async (files, field, setFieldValue) => {
    try {
      files = Array.isArray(files) ? files : [files];
      const uploadPromises = files.map(async (file) => {
        const response = await getPresignedUrl({ fileName: file.name });
        const requestOptions = {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        };
        await fetch(response.data.url, requestOptions);
        return response.data.path;
      });
      const urls = await Promise.all(uploadPromises);

      // Check if field is for bannerImages or galleryImageUrl
      if (field === "bannerImages") {
        setBannerImages([...bannerImages, ...urls]);
      } else if (field === "galleryImageUrl") {
        setGalleryImages([...galleryImages, ...urls]);
      }

      // Set field value using Formik's setFieldValue
      setFieldValue(field, urls);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleStateChange = (selectedState) => {
    const selectedCities = data[selectedState];
    const cityOptions = selectedCities.map((city) => ({
      value: city,
      text: city,
    }));
    setCityOptions([{ value: "", text: "Select City" }, ...cityOptions]);
  };
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
                <InputText
                  type="text"
                  name="name"
                  label="Salon Name"
                  placeholder="Salon Name"
                />
                <InputText
                  type="text"
                  name="gst"
                  label="GST Number"
                  placeholder="GST Number"
                />
                <InputText
                  type="text"
                  name="companyName"
                  label="Company Name"
                  placeholder="Company Name"
                />
                <InputText
                  type="text"
                  name="panNumber"
                  label="Pan Number"
                  placeholder="Pan Number"
                />
                <TextArea
                  rows="5"
                  name="address"
                  label="Salon Address"
                  placeholder="Salon Address"
                  className={styles.address}
                />
               
                <InputSelect
                  name="state"
                  label="Salon State"
                  options={states.map((state) => ({
                    value: state,
                    text: state,
                  }))}
                  onChange={(e) => {
                    setFieldValue("state", e.target.value);
                    handleStateChange(e.target.value);
                  }}
                />
                 <InputSelect
                  name="city"
                  label="Salon City"
                  options={cityOptions}                />
                <InputText
                  type="text"
                  name="pinCode"
                  label="Pin Code"
                  placeholder="Pin Code"
                />
                <InputSelect
                  name="serviceType"
                  label="Service For"
                  options={serviceOptions}
                />
                <Section className="d-flex flex-column align-items-start"></Section>
                <Section className="d-flex flex-column align-items-start mb-4">
                  <Label text="Salon Images" />
                  <InputFile
                    name="mainGateUrl"
                    helperText="Main Gate"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "mainGateUrl", setFieldValue)
                    }
                  />
                  <InputFile
                    name="galleryImageUrl"
                    helperText="Gallery"
                    onFileSelect={(e) =>
                      handleOnFile(e, "galleryImageUrl", setFieldValue)
                    }
                  />
                  <InputFile
                    name="bannerImages"
                    helperText="Banner Images"
                    onFileSelect={(e) =>
                      handleOnFile(e, "bannerImages", setFieldValue)
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

export default BusinessDetails;
