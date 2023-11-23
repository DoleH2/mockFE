import '../../css/toaststyle.css'
const Toast = ({toastStatus,onClose,message})=>{
    return(
        toastStatus === 'success' ?
        (
            <div className="toast align-items-center border-success" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body text-success">
                        {message||'Success ! Thành công'}
                    </div>
                    <button type="button" className="btn btn-close me-2 m-auto" onClick={() => {onClose('')}}></button>
                </div>
            </div>
        ) : toastStatus === 'error' ? (
            <div className="toast align-items-center border-danger" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body text-danger">
                        {message || 'Xảy ra lỗi, vui lòng thử lại'}
                    </div>
                    <button type="button" className="btn btn-close me-2 m-auto" onClick={() => {onClose('')}}></button>
                </div>
            </div>

        ):null
    )
}
export default Toast