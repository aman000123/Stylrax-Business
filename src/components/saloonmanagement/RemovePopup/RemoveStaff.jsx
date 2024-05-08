
const RemoveStaff = ({ message, onConfirm, onCancel }) => {
  return (
    <div className=''>
    <div className=''>
      <p>{message}</p>
      <div className=''>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  </div>

  );
}

export default RemoveStaff;
