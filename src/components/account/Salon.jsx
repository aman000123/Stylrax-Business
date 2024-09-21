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
import OTPInput from "react-otp-input";
import { verifyEmail, verifyEmailOtp } from "../../api/account.api";
import { FaCheckCircle } from "react-icons/fa";
import { updateProfileStatus } from "../../store/auth.slice";
import { useDispatch } from "react-redux";

const serviceOptions = [
  { value: "", text: "Select Service" },
  { value: "Male", text: "Male" },
  { value: "Female", text: "Female" },
  { value: "Unisex", text: "Unisex" },
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
  homeService: false,
  bannerImages: [],
  gallaryImages: [],
};

const BusinessDetails = ({ onContinue, token }) => {
  const [bannerImages, setBannerImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [cityOptions, setCityOptions] = useState([
    { value: "", text: "Select salon city" },
  ]);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const states = Object.keys(data);
  const dispatch = useDispatch();

  // console.log('Business details ::>');
  const handleOnSubmit = async (values) => {
    // console.log(" Handle Submit Salon Details ::", values);
    try {
      const verifyForm = {
        name: values.name,
        email: values.email,
        gstNumber: values.gst,
        companyName: values.companyName,
        address: values.address,
        latitude: "",
        longitude: "",
        city: values.city,
        state: values.state,
        pincode: values.pinCode,
        serviceType: values.serviceType,
        homeService: values.homeService,
        mainGateImageUrl: values.mainGateUrl,
        bannerImages: bannerImages,
        gallaryImages: galleryImages,
      };
      const res = await createSalon(verifyForm);
      // console.log("respn::>", res);
      dispatch(updateProfileStatus(2));
      const salonId = res.data.id;
      // console.log("salon id:::>", salonId);
      onContinue(salonId);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const renderInput = (props, index) => (
    <input
      {...props}
      key={index}
      autoFocus={index === 0}
      className={styles.inputOtp}
      pattern="[0-9]*"
      inputMode="numeric"
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }}
      onKeyDown={(e) => {
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );

  const handleVerifyEmailClick = async (values) => {
    try {
      const verifyEmailData = {
        email: values.email,
      };
      // console.log("verifyEmailData ::>", verifyEmailData);
      const res = await verifyEmail(verifyEmailData);
      // console.log("Email verification ::>", res);
      setShowOTP(true);
      Notify.success(res.message);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleOTPVerification = async (otp, values) => {
    try {
      const verifyOtpData = {
        email: values.email,
        otp: otp,
      };
      const otpRes = await verifyEmailOtp(verifyOtpData);
      Notify.success(otpRes.message);
      setShowOTP(false);
      setIsEmailVerified(true);
      setIsOTPVerified(true);
      setOtp("");
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
    setCityOptions([{ value: "", text: "Select salon city" }, ...cityOptions]);
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
            {({ values, setFieldValue }) => (
              <Form className="d-flex flex-column">
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
                  label="Company Name (optional)"
                  placeholder="Enter company name"
                />
                <InputText
                  type="text"
                  name="panNumber"
                  label="Pan Number"
                  placeholder="Enter pan number"
                />
                <TextArea
                  rows="5"
                  name="address"
                  label="Salon Address"
                  placeholder="Enter salon address"
                  className={styles.address}
                />
                <InputText
                  type="email"
                  name="email"
                  label="Salon Email (optional) "
                  placeholder="Enter salon email ID"
                  icon={isOTPVerified && <FaCheckCircle />}
                  iconClass="text-success"
                  disable={isOTPVerified}
                />

                {values.email && !showOTP && !isEmailVerified && (
                  <Section className="">
                    <button
                      type="button"
                      className={styles.verify__email_button}
                      onClick={() => handleVerifyEmailClick(values)}
                    >
                      Verify Email
                    </button>
                  </Section>
                )}
                {showOTP && (
                  <>
                    <label htmlFor="otp" className="fw-bold">
                      OTP
                    </label>
                    <div className="otp-box d-flex justify-content-center">
                      <OTPInput
                        value={otp}
                        onChange={(otpValue) => {
                          setOtp(otpValue);
                          if (otpValue.length === 4) {
                            handleOTPVerification(otpValue, values);
                          }
                        }}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        renderInput={renderInput}
                      />
                    </div>
                  </>
                )}

                <InputSelect
                  name="state"
                  label=" Salon State"
                  options={states.map((state) => ({
                    value: state,
                    text: state,
                  }))}
                  onChange={(e) => {
                    setFieldValue("state", e.target.value);
                    handleStateChange(e.target.value);
                  }}
                />
                <InputSelect name="city" label="Salon City" options={cityOptions} />
                <InputText
                  type="text"
                  name="pinCode"
                  label="Salon Pin Code"
                  placeholder="Select salon pin code"
                />
                <InputSelect
                  name="serviceType"
                  label="Service Type"
                  options={serviceOptions}
                />
                <label>
                  <input
                    type="checkbox"
                    name="homeService"
                    onChange={(e) =>
                      setFieldValue("homeService", e.target.checked)
                    }
                  />
                  &nbsp; Provide Home Services
                </label>
                <Section className="d-flex flex-column align-items-start"></Section>
                <Section className="d-flex flex-column align-items-start mb-4">
                  <Label text="Salon Images" />
                  <InputFile
                    name="mainGateUrl"
                    helperText=" Upload salon main gate image"
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
