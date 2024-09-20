export default function Label({ text, ...rest }) {
  return(
    <label className="fw-bold" {...rest}>
        {text}
    </label>
  )
}