import '../../css/mngstyle.css';
import MenuSide from './MenuSide';
import imgEmpty from '../../img/logo/images.jfif'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ManagementPage = () => {
    let navigate = useNavigate();
    const changeRouter = (path) => {
        navigate(path);
    }

    return (
        <div className="container-fluid p-0 d-flex" style={{ backgroundColor: '#F6F6F6' }}>
            {/* menu side */}
            <MenuSide></MenuSide>
            {/* end menu side */}
            {/* content */}
            <div className='frame-view-contents w-100 p-0 d-flex flex-column align-items-center justify-content-center'
                style={{ height: '100vh', marginLeft: '300px' }}>
                <img className='d-block' src={imgEmpty} style={{ width: '300px' }}></img>
                <p className='fs-5'>Vui lòng chọn chức năng ở thanh menu bên trái</p>
            </div>
            {/* end content */}
        </div>
    )
}

export default ManagementPage;