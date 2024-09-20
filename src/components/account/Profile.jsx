import { Field, Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import { InputText, InputSelect, InputFile, Label } from "../../ux/controls";
import Section from "../../ux/Section";
import Notify from "../../utils/notify";
import { salonProfileSchema } from "../../utils/schema";
import FormContainer from "./FormContainer";
import { createProfile } from "../../api/user.api";
import { handleOnFileSelect } from "./FileUploader";
import styles from "./account.module.css";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { verifyEmail, verifyEmailOtp } from "../../api/account.api";
import { FaCheckCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { updateProfileStatus } from "../../store/auth.slice";

const Profile = ({ onContinue, token }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    panCardImageUrl: "",
    aadharFrontUrl: "",
    aadharBackUrl: "",
    profileImageUrl: "",
  };

  const genderOptions = [
    { value: "", text: "Select" },
    { value: "Male", text: "Male" },
    { value: "Female", text: "Female" },
  ];

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

  const handleOnSubmit = async (values) => {
    const formattedDate = formatDate(values.dataOfBirth);
    // console.log("Data Form ::>", dataForm);
    try {
      const dataForm = {
        profileType: "Salon",
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        dateOfBirth: formattedDate,
        gender: values.gender,
        panCardImageUrl: values.panCardImageUrl,
        aadharFrontUrl: values.aadharFrontUrl,
        aadharBackUrl: values.aadharBackUrl,
        profileImageUrl: values.profileImageUrl,
        serviceType: "Male",
      };
      await createProfile(dataForm);
      dispatch(updateProfileStatus(1));
      // onContinue(values);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const getMinDOBDate = () => {
    const currentDate = new Date();
    return new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    )
      .toISOString()
      .split("T")[0];
  };

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

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <Container>
      <Section className="d-flex flex-column align-items-center">
        <FormContainer>
          <Section className="d-flex flex-column align-items-center mb-1">
            {/* <img src={client3} className={styles.client} alt="client" /> */}
          </Section>
          <Formik
            initialValues={initialValues}
            validationSchema={salonProfileSchema}
            onSubmit={handleOnSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form id="profile-form" className="d-flex flex-column">
                <InputText
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <InputText
                  type="text"
                  name="middleName"
                  label="Middle Name (optional)"
                  placeholder="Enter your middle name"
                />
                <InputText
                  type="text"
                  name="lastName"
                  label="Last Name (optional)"
                  placeholder="Enter your last name"
                />
                <InputText
                  type="email"
                  name="email"
                  label="Email ID"
                  placeholder="Enter your email ID"
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

                {/* <InputText
                  type={type}
                  name="dataOfBirth"
                  onFocus={() => setType("date")}
                  onBlur={() => setType("text")}
                  label="Date of Birth"
                  placeholder="Select your date of birth"
                  max={getMinDOBDate()}
                /> */}
                <label className="fw-bold">Date Of Birth</label>
                <Field
                  // as={DatePicker}
                  type="date"
                  placeholderText="Select your date of birth"
                  name="dataOfBirth"
                  max={getMinDOBDate()}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                />

                <InputSelect
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                />
                <Section className="d-flex flex-column align-items-start mb-1">
                  <Label text="Aadhaar Card" />
                  <InputFile
                    name="aadharFrontUrl"
                    helperText="Front"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "aadharFrontUrl", setFieldValue)
                    }
                  />
                  <InputFile
                    name="aadharBackUrl"
                    helperText="Back"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "aadharBackUrl", setFieldValue)
                    }
                  />
                </Section>
                <Section className="d-flex flex-column align-items-start mb-1">
                  <InputFile
                    name="panCardImageUrl"
                    label="PAN Card"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "panCardImageUrl", setFieldValue)
                    }
                  />
                </Section>
                <Section className="d-flex flex-column align-items-start mb-4">
                  <InputFile
                    name="profileImageUrl"
                    label="Profile Image"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "profileImageUrl", setFieldValue)
                    }
                  />
                </Section>
                <Section className="d-flex flex-column align-items-center">
                  <button
                    type="submit"
                    className={styles.registration__submit_button}
                  >
                    Continue
                  </button>
                </Section>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Section>
    </Container>
  );
};

export default Profile;
