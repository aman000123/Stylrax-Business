import { useState } from "react";
import { Navigate } from "react-router-dom";
import Salon from "../components/account/Salon";
import BankDetails from "../components/account/BankDetails";
import Finish from "../components/account/Finish";
import Header from "../layout/Header";
import StepperMenu from "../components/account/StepperMenu";
import Profile from "../components/account/Profile";
import Section from "../ux/Section";
import { useSelector } from "react-redux";
import Footer from "../components/home/footer/Footer";

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
  const authToken = useSelector((state) => state.auth.token);

  if (!authToken) {
    return <Navigate to="/home" />;
  }

  const handleBusinessDetails = (salonId) => {
    setSalonId(salonId);
  };

  const getCurrentForm = {
    0: <Profile />,
    1: <Salon onContinue={handleBusinessDetails} />,
    2: <BankDetails salonId={salonId} />,
    3: <Finish />,
  };
  return (
    <Section>
      <Header>
        <StepperMenu steps={accountSteps} activeStep={status} />
      </Header>
      {getCurrentForm[status]}
      <Footer />
    </Section>
  );
};

export default CreateAccount;
