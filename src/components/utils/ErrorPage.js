import { useLocation, useNavigate } from 'react-router-dom';
import imgError from '../../img/error/error.PNG'
const ErrorPage = () => {
    const location = useLocation();
    const errorSend = location.state;
    // di chuyển sang url khác, chuyển trang
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    console.log(errorSend);
    //end chuyen trang
    return (
        <div className="container-fluid p-0 m-0 w-100 h-100" style={{ position: "fixed" }}>
            <div className="content d-flex align-items-center justify-content-center h-100 flex-column">
                <img src={imgError} style={{ width: '500px' }}></img>
                <div className='frame-title-error d-flex align-items-center flex-column'>
                    <p className="fw-bold ms-3 mb-0" style={{ fontSize: '5rem', color: '#606060' }}>Ooops!</p>
                    <p className='status-text fw-bold m-0' style={{ fontSize: '4rem', color: '#562F5E' }}>
                        {errorSend&&errorSend.code || 404}
                    </p>
                </div>
                <p className='fs-5'>{errorSend&&errorSend.message || 'Trang này không tồn tại'}</p>
                <button className='btn btn-light border border-dark-subtle rounded-pill fw-bold px-3 py-2 mb-5' onClick={()=>{changeRouter("/")}}>Go Back</button>
            </div>
        </div>
    )
}

export default ErrorPage;