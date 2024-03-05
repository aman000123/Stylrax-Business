import React, { useState } from "react";
import { doLogin } from "../../api/account.api";
import { storeToken } from "../../features/authInfo";
import { useDispatch } from "react-redux";
import Notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";

 



  const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(""); // State for phone number error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatePhoneNumber(phoneNumber)) { // Check validation before submission
      try {
        setIsSubmitting(true);
        console.log(phoneNumber);

        const res = await doLogin({ phoneNumber });

        const { authToken: token, userInfo } = res.data.data;
        console.log("ata"+res.data.data)
        dispatch(storeToken({ token:'sampleTokenValue'}));
        navigate("/dashboard");

      } catch (error) {
        Notify.error(error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setPhoneNumberError("Please enter a valid phone number."); // Set error message
    }
  };

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneNumberError(""); // Clear error message when input changes
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Perform your validation logic here
    return /^[0-9]{10}$/.test(phoneNumber); // Example: Check if it's exactly 10 digits
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handleChange}
          required
        />
        {phoneNumberError && <div className="error">{phoneNumberError}</div>} {/* Display error message */}
        <button type="submit" disabled={!phoneNumber || isSubmitting}> {/* Disable submit if no phone number or submitting */}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default App;
