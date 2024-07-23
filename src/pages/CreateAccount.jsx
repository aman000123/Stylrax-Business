import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Salon from "../components/account/Salon";
import BankDetails from "../components/account/BankDetails";
import Finish from "../components/account/Finish";
import Service from "../components/account/Service";
import Header from "../layout/Header";
import StepperMenu from "../components/account/StepperMenu";
import Profile from "../components/account/Profile";
import Section from "../ux/Section";
import { useSelector } from "react-redux";
import Footer from "../components/home/footer/Footer";

// const accountSteps = {
//   Salon: [
//     { step: 1, text: "Account Creation", active: false },
//     { step: 2, text: "Business Details", active: false },
//     { step: 3, text: "Bank Details", active: false },
//     { step: 4, text: "Finish", active: false },
//   ],
//   Freelancer: [
//     { step: 1, text: "Account Creation", active: false },
//     { step: 2, text: "Bank Details", active: false },
//     { step: 3, text: "Finish", active: false },
//   ],
// };
const accountSteps = [
    { step: 0, text: "Account Creation", active: false },
    { step: 1, text: "Business Details", active: false },
    { step: 2, text: "Bank Details", active: false },
    { step: 3, text: "Finish", active: false },
  ];

const CreateAccount = () => {
  const [salonId, setSalonId] = useState(null);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const status = userInfo?.profileStatus;
  const [activeStep, setActiveStep] = useState(status);
  const authToken = useSelector(state => state.auth.token);

  if (!authToken) {
    return <Navigate to="/home" />;
  }
  
  const handleProfileCreate = (data) => {
    setActiveStep(activeStep + 1);
  };

  const handleBusinessDetails = (data,salonId) => {
    setSalonId(salonId);
    // console.log("salon id", salonId);
    setActiveStep(activeStep + 1);
    // setSteps(accountSteps[userType]);
    // onServiceSelect(userType);
    // console.log("user::>",userType);

  };

  const handleBankDetails = (data) => {
    // console.log("salonId in CreateAccount:", salonId);
    setActiveStep(activeStep + 1);
    //onServiceSelect(userType);
  };

  return (
    <Section>
      <Header>
        <StepperMenu steps={accountSteps} activeStep={activeStep}/>
      </Header>

      {/* {activeStep === 0 && <Service onContinue={onServiceSelect} />} */}
      {activeStep === 0 && <Profile onContinue={handleProfileCreate} />}
      {/* {activeStep === 1 && <Profile onContinue={handleProfileCreate} />} */}
      {activeStep === 1 && <Salon onContinue={handleBusinessDetails} />}
      {activeStep === 2 &&(
        <BankDetails salonId={salonId} onContinue={handleBankDetails}  />
      )}
      {activeStep === 3 && <Finish />}

    
      <Footer />
    </Section>
  );
};

export default CreateAccount;