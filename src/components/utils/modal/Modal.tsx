import './Modal.css'

const Modal = ({
  open,
  onClose,
  title,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  title?: string
  onConfirm?: (data: boolean) => void
}) => {
  return (
    <>
      <div id='backdrop' className={`backdrop ${open ? 'display-block' : 'display-none'}`}></div>
      <div className={`modal ${open ? 'display-block' : 'display-none'}`}>
        <div className='modal-header'>
          <h4>{title}</h4>
          <span className='close-btn' onClick={() => onClose()}>
            &times;
          </span>
        </div>

        <div className='modal-content'>
          <p>Are your sure to set location ?</p>
        </div>
        <div className='modal-footer'>
          <button onClick={() => onClose()} className='btn cancel-btn'>
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm && onConfirm(true)
              onClose()
            }}
            className='btn confirm-btn'
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
