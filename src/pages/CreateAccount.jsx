import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Salon from "../components/account/Salon";
import BankDetails from "../components/account/BankDetails";
import Finish from "../components/account/Finish";
import Service from "../components/account/Service";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import StepperMenu from "../components/account/StepperMenu";
import Profile from "../components/account/Profile";
import Section from "../ux/Section";
import { useSelector } from "react-redux";

const accountSteps = {
  Salon: [
    { step: 1, text: "Account Creation", active: false },
    { step: 2, text: "Business Details", active: false },
    { step: 3, text: "Bank Details", active: false },
    { step: 4, text: "Finish", active: false },
  ],
  Freelancer: [
    { step: 1, text: "Account Creation", active: false },
    { step: 2, text: "Bank Details", active: false },
    { step: 3, text: "Finish", active: false },
  ],
};

const CreateAccount = () => {
  const [steps, setSteps] = useState([]);
  const [salonId, setSalonId] = useState(null);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log("userInfo::>", userInfo);
  const status = userInfo?.profileStatus;
  console.log("statusInfo::>", status);
  const userType = userInfo?.userType;
  console.log("userType::>", userType);
  const [activeStep, setActiveStep] = useState(status);

  const location = useLocation();
  const { token = "" } = location.state || {};

  console.log("Location::>", location);
  console.log("Token::>", token);

  if (!token) {
    return <Navigate to="/home" />;
  }

  // useEffect(() => {
  //     onServiceSelect(userType);
  // }, []);

  const onServiceSelect = (userType) => {
    console.log("serviceType::>", userType);
    setSteps(accountSteps[userType]);
    setActiveStep(activeStep + 1);
  };

  const handleProfileCreate = (data) => {
    setActiveStep(activeStep + 1);
  };

  const handleBusinessDetails = (data, salonId) => {
    setSalonId(salonId);
    console.log("salon id", salonId);
    setActiveStep(activeStep + 1);
  };

  const handleBankDetails = (userType) => {
    setActiveStep(activeStep + 1);
    onServiceSelect(userType);
  };

  return (
    <Section>
      <Header>
        <StepperMenu steps={steps} activeStep={activeStep} />
      </Header>

      {activeStep === 0 && <Service onContinue={onServiceSelect} />}
      {activeStep === 1 && <Profile onContinue={handleProfileCreate} />}
      {activeStep === 2 && <Salon onContinue={handleBusinessDetails} />}
      {activeStep === 3 && (
        <BankDetails onContinue={handleBankDetails} salonId={salonId} />
      )}
      {activeStep === 4 && <Finish />}
      <Footer />
    </Section>
  );
};

export default CreateAccount;
