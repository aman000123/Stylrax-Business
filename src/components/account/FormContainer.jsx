import Section from "../../ux/Section";
import styles from "./account.module.css";

export default function FormContainer({ children }) {
  return <Section className={styles.registration__form_container}>{children}</Section>;
}
