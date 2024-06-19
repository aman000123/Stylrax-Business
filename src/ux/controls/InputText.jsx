import { Field, ErrorMessage } from 'formik';
import style from './controls.module.css';

const Input = props => {
  const { label, name, icon, iconClass, disable, ...rest } = props;
  return (
    <div className={`d-flex flex-column mb-1 ${style.control__container}`}>
      <label htmlFor={name} className='fw-bold'>{label}</label>
      <div className={`d-flex align-items-center ${style.control__input_container}`}>
        <Field id={name} className={`${style.control__input} ${icon ? style.control__input_with_icon : ''}`} name={name} {...rest} disabled={disable}/>
        {icon &&  <span className={`${style.control__icon} ${iconClass}`}>{icon}</span>}
      </div>
      <ErrorMessage component="div" name={name} className={style.control__input_error} />
    </div>
  );
}

export default Input;
