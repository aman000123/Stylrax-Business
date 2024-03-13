
import React from 'react'
import styles from "../SalonBanner/SalonBanner.module.css";
import { useState } from "react";


function SalonBanner() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <form>
        <div className={styles.imgDiv}>
          <img src={file} />
          <input type="file" onChange={handleChange}  placeholder='Upload a new'/>
        </div>
      </form>
    </div>
  )
}

export default SalonBanner
