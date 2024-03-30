// import styles from "../SalonBanner/SalonBanner.module.css";
// import { useState } from "react";
// import { GrFormUpload } from "react-icons/gr";
// import { useEffect, useRef } from "react";
// import { fileUploader } from "../../../api/account.api.js";

// function SalonBanner() {

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [url, setUrl] = useState("");
//   console.log("url:::>", url);
//   const [fileName, setFileName] = useState("");
//   useEffect(() => { }, []);
//   const fileInputRef = useRef(null);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     console.log("Selected File 1:", file.name);
//     const fileUrl = await fileUploader({ fileName: file.name });
//     console.log("fileUrl:::>", fileUrl);
//     uploadFileToS3(file, fileUrl.data.url);
//     // onSubmit(fileUrl);
//   };
//   const handleUploadIconClick = () => {
//     fileInputRef.current.click();
//   };

//   //File Upload to S3
//   const uploadFileToS3 = async (file, url) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const requestOptions = {
//         method: "PUT",
//         body: file,
//         headers: {
//           "Content-Type": file.type,
//         },
//       };
//       await fetch(url, requestOptions);
//     } catch (error) {
//       Notify.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <form>
//         <div className={styles.imgDiv}>
//           <img/>
//           <button
//             className={`${styles.Btn} align-items-center-start`}
//             onClick={handleUploadIconClick}
//             type="button"
//           >
//             <input
//               type="file"
//               name="passbook"
//               ref={fileInputRef}
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//             <br />
//             <GrFormUpload className={styles.uploadIcon} />
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default SalonBanner


import styles from "../SalonBanner/SalonBanner.module.css";
import { useState } from "react";
import { GrFormUpload, GrTrash } from "react-icons/gr"; // Import GrTrash for delete button
import { useEffect, useRef } from "react";
import { fileUploader } from "../../../api/account.api.js";

function SalonBanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Initialize with default value
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file.name);
    const fileUrl = await fileUploader({ fileName: file.name });
    console.log("fileUrl:", fileUrl);
    setSelectedFile(file); // Store the selected file
    setUrl(fileUrl.data.url);
    setFileName(file.name);
    uploadFileToS3(file, fileUrl.data.url);
  };

  const handleUploadIconClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImageUrl(""); // Clear the imageUrl to delete the image
  };

  const uploadFileToS3 = async (file, url) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const requestOptions = {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      };
      await fetch(url, requestOptions);
      // If upload is successful, set the image URL to display it
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <form>
        <div className={styles.imgDiv}>
          <img src={imageUrl}/> {/* Always display the img tag */}
          <div className={styles.uploadAndDelete}>
            {/* Upload button */}
            <button
              className={`${styles.Btn} align-items-center-start`}
              onClick={handleUploadIconClick}
              type="button"
            >
              <input
                type="file"
                name="passbook"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <br />
              <GrFormUpload className={styles.uploadIcon} />
              Upload
            </button>
            {/* Delete button */}
            {imageUrl && (
              <button
                className={`${styles.Btn2} align-items-center-start`}
                onClick={handleDeleteImage}
                type="button"
              >
                <GrTrash className={styles.uploadIcon} />
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SalonBanner;






