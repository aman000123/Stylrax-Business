import StepCircle from "../../ux/StepCircle";

export default function Stepper({steps, activeStep}){
    return (
        <ul className="d-flex gap-3">
            {steps.map((step, index) => (
                <li key={index} className="d-flex align-items-center gap-1 ">
                    <StepCircle step={step.step} active={activeStep===step.step} />
                    {step.text} 
                </li>
            ))}
        </ul>
    )
}