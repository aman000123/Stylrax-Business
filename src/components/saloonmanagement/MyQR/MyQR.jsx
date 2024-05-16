 import Notify from "../../../utils/notify";
import Session from '../../../service/session';
import { useState } from 'react';
import { useEffect } from 'react';
import { myQr } from '../../../api/salon.management';

const MyQR = () => {
    const salonId = Session.get("salonId");
    const [qr, setQr] = useState("");
    useEffect(() => {
      const getQr = async () => {
        try {
          const response = await myQr(salonId);
          const myQR = response.data; 
          console.log("qr::>", myQR);
          setQr(myQR);
        } catch (error) {
          Notify.error(error.message);
        }
      };
  
      getQr();
    }, [salonId]);
  return (
    <div  className="d-flex justify-content-center align-items-center mt-5">
  {qr && <img src={`data:image/png;base64,${qr}`} alt="QR Code" style={{ width: '350px', height: '350px' }}/>}   
   </div>
  );
}

export default MyQR;
