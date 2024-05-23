import { useState } from "react";
import { createSalon } from "../../../api/salon.api";
import { getPresignedUrl } from "../../../api/file.api";
import Section from "../../../ux/Section";
import FormContainer from "../../account/FormContainer";
import { Form, Formik } from "formik";
import { businessDetailsSchema } from "../../../utils/schema";
import {
  Button,
  InputFile,
  InputSelect,
  InputText,
  Label,
  TextArea,
} from "../../../ux/controls";
import { handleOnFileSelect } from "../../account/FileUploader";
import Notify from "../../../utils/notify";
import styles from "../../account/account.module.css";
import { data } from "../../account/Data";
console.log("data", data);

const states = Object.keys(data);

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

const NewSalon = ({ onClose,updatedData }) => {
  const [bannerImages, setBannerImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [cityOptions, setCityOptions] = useState([
    { value: "", text: "Select City" },
  ]);
  const handleOnSubmit = async (event,values) => {
    //onContinue(values);
    event.stopPropagation();
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
      Notify.success("New Salon Added");
      updatedData();
      onClose();
      console.log("respn::>", res);
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

  const handleClickInside = (event) => {
    event.stopPropagation(); // Prevent event propagation
  };
  return (
    <>
      <Section className="d-flex flex-column align-items-center">
        <FormContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={businessDetailsSchema}
            onSubmit={(values, { event }) => handleOnSubmit(event, values)}          >
            {({ setFieldValue }) => (
              <Form className="d-flex flex-column" onClick={handleClickInside}>
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
                  options={cityOptions}
                />
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
    </>
  );
};

export default NewSalon;
