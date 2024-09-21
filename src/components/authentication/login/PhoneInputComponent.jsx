import { useFormikContext } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputComponent = ({ value, style }) => {
  const { setFieldValue } = useFormikContext();


  return (
    <PhoneInput
      inputStyle={style}
      containerClass="phone-container"
      country={"in"}
      placeholder="Enter phone number"
      onlyCountries={["in"]}
      countryCodeEditable={false}
      value={value ? `+91${value}` : ""}
      onChange={(_, __, ___, formattedValue) => {
        // Remove the country code prefix and any "-" characters
        const sanitizedPhoneNumber = formattedValue
          .replace(/^(\+91|91|-)/, "")
          .replace(/-/g, "");
        setFieldValue("phoneNumber", sanitizedPhoneNumber.trim());
        // console.log("Phone number entered:", sanitizedPhoneNumber.trim());
      }}
    />
  );
};

export default PhoneInputComponent;
