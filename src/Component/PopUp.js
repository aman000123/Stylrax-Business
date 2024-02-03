import { useEffect, useState } from "react";

const PopUp = ({ show, handleClose, handleEdit, rowData }) => {
  const [editedData, setEditedData] = useState({ ...rowData });
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    setEditedData({ ...rowData });
    setIsBlocked(rowData.isBlocked || false);
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggleBlock = () => {
    // Toggle the block state
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);
  };

  const handleSubmit = () => {
    // Call the handleEdit function with the edited data
    handleEdit(editedData);
    handleClose();
  };

  return (
    <div className={`popup ${show ? "show" : ""}`}>
      <div className="popup-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <img
          width={50}
          height={50}
          src={rowData.flag}
          alt="icon"
          className="d-flex justify-content-center align-items-center m-auto"
        />
        <h4 className="text-center mt-2">{rowData.name}</h4>
        <div className="d-flex align-items-evenly mb-2">
          <p className="small fw-bold">Country Name :</p>
          <p className="ps-2">{rowData.nativeName}</p>
          {/* <p>Email id :</p>
          <p>{editedData.email}</p> */}
        </div>

        <div className="d-flex align-items-evenly mb-2 ">
          <p className="small fw-bold">Coutry Capital :</p>
          <p className="ps-2"> {rowData.capital} </p>
          {/* <p>Number :</p>
          <p>{editedData.number}</p> */}
        </div>

        <div className="d-flex align-items-evenly mb-2 ">
          <p className="small fw-bold">Address :</p>
          <p className="ps-2">{editedData.address}</p>
        </div>

        <div className="d-flex align-items-evenly mb-2 ">
          <p className="small fw-bold">
            Total <br /> Completed Appointments:
          </p>
          {/* <p className="data-detail">{editedData.totalCompletedAppointments}</p> */}
          <p className="data-detail ps-2"> 7777777</p>
        </div>

        <div className="d-flex align-items-evenly mb-2 ">
          <p className="small fw-bold">
            Total
            <br /> Canceled Appointments:
          </p>
          <p className="data-detail ps-2">
            {editedData.totalCanceledAppointments}
          </p>
        </div>

        <div className="d-flex align-items-evenly mb-2 ">
          <p className="small fw-bold">Joining Date:</p>
          <p className="ps-2">{editedData.joiningDate}</p>
        </div>

        <div className="d-flex justify-content-center ">
          <button onClick={handleToggleBlock} className="popup-btn">
            {isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
