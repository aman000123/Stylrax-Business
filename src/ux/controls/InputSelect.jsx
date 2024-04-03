import { Field, ErrorMessage } from 'formik'
import style from './controls.module.css'

export default function InputSelect({ label, name, options, ...rest }) {
    return (

        <div className="d-flex flex-column mb-1">
            <label className="fw-bold">{label}</label>
            <Field
                as="select"
                id={name} className={style.control__input} name={name} {...rest}
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    )
                })}
            </Field>
            <ErrorMessage component="div" name={name} className={style.control__input_error} />
        </div>

    )
}