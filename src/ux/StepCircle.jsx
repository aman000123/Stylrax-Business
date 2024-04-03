export default function StepCircle({ step, active, ...rest }) {
    return (
      <div className={`step-circle ${active ? "active":""}`} {...rest}>
        {step}
      </div>
    );
  }