import { Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import { InputText, InputSelect, InputFile, Label } from "../../ux/controls";
import Section from "../../ux/Section";
import Notify from "../../utils/notify";
import { salonProfileSchema } from "../../utils/schema";
import FormContainer from "./FormContainer";
import { createProfile } from "../../api/user.api";
import { handleOnFileSelect } from "./FileUploader";
import client3 from "../../assets/image/client3.svg";
import styles from "./account.module.css";
import { useState } from "react";

const Profile = ({ onContinue, token }) => {
  console.log("temp::>", token);
  const [type, setType] = useState("text");

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dataOfBirth: "",
    gender: "",
    panCardImageUrl: "",
    aadharFrontUrl: "",
    aadharBackUrl: "",
    profileImageUrl: "",
  };

  const genderOptions = [
    { value: "", text: "Select" },
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
    { value: "both", text: "Both" },
  ];

  const handleOnSubmit = async (values) => {
    // onContinue(values);
    try {
      const dataForm = {
        profileType: "Salon",
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        dataOfBirth: values.dataOfBirth,
        gender: values.gender,
        panCardImageUrl: values.panCardImageUrl,
        aadharFrontUrl: values.aadharFrontUrl,
        aadharBackUrl: values.aadharBackUrl,
        profileImageUrl: values.profileImageUrl,
        serviceType: "Male",
      };
      const res = await createProfile(dataForm, token);
      console.log("response:::>", res.data);

      onContinue(values);
    } catch (error) {
      Notify.error(error.message);
    }
  };
  
      
    
  return (
    <Container>
      <Section className="d-flex flex-column align-items-center">
        <FormContainer>
          <Section className="d-flex flex-column align-items-center mb-1">
            <img src={client3} className={styles.client} alt="client" />
          </Section>
          <Formik
            initialValues={initialValues}
            validationSchema={salonProfileSchema}
            onSubmit={handleOnSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="d-flex flex-column">
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
                />
                <InputText
                  type={type}
                  name="dataOfBirth"
                  onFocus={() => setType("date")}
                  onBlur={() => setType("text")}
                  label="Date of Birth"
                  placeholder="Select your date of birth"
                  max={new Date().toISOString().split("T")[0]}
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
