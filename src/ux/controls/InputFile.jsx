import { GrFormUpload } from "react-icons/gr";
import style from './controls.module.css'
import { useState } from "react";
import { ErrorMessage } from "formik";
export default function InputFile({ label, helperText, onFileSelect,name, ...rest }) {

    const [file, setFile] = useState("");

    const handleOnClick = (e) => {
        e.preventDefault();
        const input = document.querySelector(`input[name=${name}]`);
        input.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        onFileSelect(file)
      };

    return (
        <div className='d-flex flex-column mb-1 '>
            <label htmlFor={rest.name} className='fw-bold'>{label}</label>
            {helperText && <small>{helperText}</small>}
            <div className={style.control__input_file}>
                <button type="button" onClick={handleOnClick} className={style.control__input_file_button}>
                   <GrFormUpload/>
                     Upload
                </button>
                <input type='file' name={name} {...rest}  style={{display:"none"}} onChange={handleFileChange}  />
                <small className="p-2">{file?.name}</small>
                <ErrorMessage component="div" name={name} className={style.control__input_error} />
            </div>
        </div>
    )
}