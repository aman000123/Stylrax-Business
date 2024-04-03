import { useState } from "react";
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


const accountSteps = {
    Salon: [
        { step: 1, text: "Account Creation", active: false },
        { step: 2, text: "Business Details", active: false },
        { step: 3, text: "Bank Details", active: false },
        { step: 4, text: "Finish", active: false }
    ],
    Freelancer: [
        { step: 1, text: "Account Creation", active: false },
        { step: 2, text: "Bank Details", active: false },
        { step: 3, text: "Finish", active: false }
    ]
}

const CreateAccount = () => {
    const [steps, setSteps] = useState([]); // [accountSteps.freelancer
    const [activeStep, setActiveStep] = useState(0);
    const location = useLocation();
    const { token="" } = location.state || {};

    //If location state is not set with access token, redirect to home
    if(!token){
        return <Navigate to="/home" />;
    }

    const handleProfileCreate = (data) => {
        setActiveStep(activeStep + 1);
    };

    const handleBusinessDetails = (data) => {
        setActiveStep(activeStep + 1);

    }

    const onServiceSelect = (service) => {
        console.log(service);
        setSteps(accountSteps[service]);
        setActiveStep(activeStep + 1);

    }

    const handleBankDetails = (data) => {
        setActiveStep(activeStep + 1);
    }

    return (
        <Section>
            <Header>
                <StepperMenu steps={steps} activeStep={activeStep} />
            </Header>
            {activeStep === 0 && <Service onContinue={onServiceSelect} />}
            {activeStep === 1 && <Profile onContinue={handleProfileCreate} />}
            {activeStep === 2 && <Salon onContinue={handleBusinessDetails} />}
            {activeStep === 3 && <BankDetails onContinue={handleBankDetails} />}
            {activeStep === 4 && <Finish />}
            <Footer />
        </Section>
    );
};

export default CreateAccount;
