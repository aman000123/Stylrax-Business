import { Paper } from "@mui/material";
import { MdOutlineContentPaste } from "react-icons/md";
import React, { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const AddServiceType = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <Paper className="add-service-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <MdOutlineContentPaste />
        <p className=" ps-1 fw-bold  mb-0">Add Service Type</p>
      </div>
      <hr />
      <form className="d-flex flex-column align-items-center">
        <div className=" d-flex flex-column align-items-start mb-1">
          <label className="fw-bold">Name</label>
          <input placeholder="Hair" className="add-service-input" />
        </div>

        <div className=" d-flex flex-column align-items-start mb-2">
          <label className="fw-bold">Description</label>
          <textarea
            className="add-service-type-textarea"
            rows="6"
            cols="25"
          ></textarea>
        </div>
        <div className=" d-flex flex-column align-items-start mb-2">
          <label className="fw-bold ">File Uploader</label>
          <div
            className="custom-file-upload-input"
            onClick={handleFileUploadClick}
          >
            <div className="file-icon">
              <IoMdCloudUpload />
            </div>
            Drags file to upload
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="file-upload-input"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="add-service-btn mt-2" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </Paper>
  );
};

export default AddServiceType;
