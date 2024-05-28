import { useEffect, useRef, useState } from "react";
import { createSalon } from "../../../api/salon.api";
import { getPresignedUrl } from "../../../api/file.api";
import { salonAddress } from "../../../api/salon.api";
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
import SalonBank from "./SalonBank";

console.log("data", data);

const states = Object.keys(data);

const serviceOptions = [
  { value: "", text: "Select salon service" },
  { value: "Male", text: "Male" },
  { value: "Female", text: "Female" },
  { value: "Both", text: "Both" },
];

const initialValues = {
  name: "",
  gst: "",
  email: "",
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
  provideHomeServices: false, // Add initial value for checkbox
};

const NewSalon = ({ onClose, updatedData }) => {
  const [bannerImages, setBannerImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const containerRef = useRef(null);
  const [cityOptions, setCityOptions] = useState([
    { value: "", text: "Select salon city" },
  ]);
  const [salonId, setSalonId] = useState(null);
  const [showSalonDetails, setShowSalonDetails] = useState(false); 

  const handleOnSubmit = async (event, values) => {
    //event.stopPropagation();
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
        homeService: values.provideHomeServices, // Include home service value
        mainGateImageUrl: values.mainGateUrl,
        bannerImages: bannerImages,
        gallaryImages: galleryImages,
      };
      const res = await createSalon(verifyForm);
      Notify.success("New Salon Added");
      const newSalonId = res.data.id;
      setSalonId(newSalonId); // Save the salon ID
      // updatedData();
      setShowSalonDetails(true); // Show the new component

      if (values.provideHomeServices) {
        await salonAddress(newSalonId, { field: "range", value: "1.5" });
      }
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

      if (field === "bannerImages") {
        setBannerImages([...bannerImages, ...urls]);
      } else if (field === "galleryImageUrl") {
        setGalleryImages([...galleryImages, ...urls]);
      }

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
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {};
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!showSalonDetails ? (
        <div
          ref={containerRef}
          className="new-salon-container"
          onClick={handleClickInside}
        >
          <Section className="d-flex flex-column align-items-center">
            <FormContainer>
              <Formik
                initialValues={initialValues}
                validationSchema={businessDetailsSchema}
                onSubmit={(values, { event }) => handleOnSubmit(event, values)}
              >
                {({ setFieldValue }) => (
                  <Form
                    className="d-flex flex-column"
                    onClick={handleClickInside}
                  >
                    <InputText
                      type="text"
                      name="name"
                      label="Salon Name"
                      placeholder="Enter salon name"
                    />
                    <InputText
                      type="text"
                      name="gst"
                      label="GST Number (optional)"
                      placeholder="Enter GST number"
                    />
                    <InputText
                      type="text"
                      name="companyName"
                      label="Company Name"
                      placeholder="Enter company name"
                    />
                    <InputText
                      type="text"
                      name="panNumber"
                      label="Pan Number"
                      placeholder="Enter pan number"
                    />
                    <InputText
                      type="text"
                      name="email"
                      label="Salon Email (optional)"
                      placeholder="Enter salon email ID"
                    />
                    <TextArea
                      rows="5"
                      name="address"
                      label="Salon Address"
                      placeholder="Enter salon address"
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
                      label="Salon Pin Code"
                      placeholder="Enter salon pin code"
                    />
                    <InputSelect
                      name="serviceType"
                      label="Service Type"
                      options={serviceOptions}
                    />
                    <label>
                      <input
                        type="checkbox"
                        name="provideHomeServices"
                        onChange={(e) => setFieldValue("provideHomeServices", e.target.checked)}
                      />
                      &nbsp; Provide Home Services
                    </label>
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
        </div>
      ) : (
        <SalonBank salonId={salonId} onClose={onClose} />
      )}
    </>
  );
};

export default NewSalon;
