import { Field, ErrorMessage } from 'formik'
import style from './controls.module.css'

const TextArea = props => {
  const {label, name, ...rest } = props
  return (
    <div className='d-flex flex-column mb-1'>
      <label htmlFor={name} className='fw-bold'>{label}</label> 
      <Field as="textarea" id={name} className={style.control__input} name={name} {...rest} />
      <ErrorMessage component="div" name={name} className={style.control__input_error} />
    </div>
  )
}

export default TextArea
