import { Container } from "react-bootstrap";
import styles from "./account.module.css";
import { Button } from "../../ux/controls";
import Section from "../../ux/Section";
const Service = ({ onContinue }) => {

  return (
    <Container>
      <Section className={`d-flex justify-content-center ${styles.registration__service_container}`}>
        <Section className="d-flex flex-column align-self-center">
          <Button onClick={()=>onContinue('Salon')} >Salon</Button>
          <Button onClick={()=>onContinue('Freelancer')}>Freelancer</Button>
        </Section>
      </Section>
    </Container>
  );
};

export default Service;
