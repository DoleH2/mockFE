import { useNavigate } from 'react-router-dom';
import imgUser from '../../img/logo/User-avatar.svg.png'
const MenuSide = ({ select }) => {

    let navigate = useNavigate();
    const changeRouter = (path) => {
        navigate(path);
    }
    const userInfor = JSON.parse(localStorage.userInfor);
    const handleClickInfo = () => {

    }

    const handleClickLogout = () => {
        localStorage.clear();
        changeRouter("/")
    }

    return (
        <div className="frame-menu border-end d-flex flex-column shadow" style={{ height: '100vh', width: '25%', maxWidth: '300px', minWidth: '240px', position: 'fixed', backgroundColor: "#2B2D31", zIndex: '1' }}>
            <div className='frame-title border-bottom'>
                <button className='p-2 fs-4 m-0' style={{ all: 'unset', cursor: 'pointer', color: '#F8FAF0' }}
                    onClick={() => { changeRouter('/management') }}
                >Quản Lý Cửa Hàng</button>
            </div>
            {
                userInfor.role === "[ROLE_ADMIN]" &&
                    (
                        <div className={"menu-item frame-view-content d-flex align-items-center" + (select === 'qlnv' ? ' ' + 'selected' : '')} style={{ color: '#3B7FB9' }}>
                            <button className='w-100 px-3 py-2 d-flex align-items-center gap-2' style={{ all: 'unset', cursor: 'pointer' }} onClick={() => { changeRouter('/list-emp') }}
                            ><i className="fa-solid fa-users"></i>Nhân Viên</button>
                        </div>
                    )
            }

            <div className="accordion menu-item frame-form-content d-flex align-items-center text-dark" style={{ color: '#3B7FB9' }}>
                <div className='accordion-item w-100 border-0 bg-body'>
                    <div className='accordion-header w-100'>
                        <button className={'btn w-100 accordion-button collapsed d-flex px-3 py-2 d-flex align-items-center gap-2' + (select === 'listhh' ? ' ' + 'selected' : '')} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne"
                            style={{ all: 'unset', cursor: 'pointer' }}
                        ><i className="fa-solid fa-box"></i>Hàng Hóa
                        </button>
                    </div>
                    <div id="collapseTwo" className="accordion-collapse collapse mx-3" data-bs-parent="#accordionExample">
                        <div className="accordion-body p-0">
                            <button className={'btn p-0 btn-drop border-0 rounded-0 w-100 text-start' + (select === 'listsp' ? ' ' + 'selected' : '')} onClick={() => { changeRouter('/list-sanpham') }}><p className='m-0 w-100 p-2'>Danh sách Sản Phẩm</p></button>
                            {/* <button className='btn ps-1 py-2 btn-drop border-bottom rounded-0 w-100 text-start' onClick={() => { changeRouter('/list-dichvu') }}>Danh sách Dịch Vụ</button> */}
                            <button className={'btn p-0 btn-drop border-0 rounded-0 w-100 text-start' + (select === 'listnh' ? ' ' + 'selected' : '')} onClick={() => { changeRouter('/list-hdnh') }}><p className='m-0 w-100 p-2'>Danh sách Nhập Hàng</p></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"menu-item frame-view-content d-flex align-items-center" + (select === 'qlgd' ? ' ' + 'selected' : '')} style={{ color: '#3B7FB9' }}>
                <button className='w-100 px-3 py-2 d-flex align-items-center gap-2' style={{ all: 'unset', cursor: 'pointer' }} onClick={() => { changeRouter('/list-hdbh') }}
                ><i className="fa-solid fa-right-left"></i>Giao Dịch</button>
            </div>

            <div className={"menu-item frame-view-content d-flex align-items-center" + (select === 'hdbh' ? ' ' + 'selected' : '')} style={{ color: '#3B7FB9' }}>
                <button className='w-100 px-3 py-2 d-flex align-items-center gap-2' style={{ all: 'unset', cursor: 'pointer' }} onClick={() => { changeRouter('/add-hdbh') }}
                ><i className="fa-solid fa-basket-shopping"></i>Bán Hàng</button>
            </div>

            <div className="accordion menu-item frame-form-content d-flex align-items-center text-dark" style={{ color: '#3B7FB9' }}>
                <div className='accordion-item w-100 border-0 bg-body'>
                    <div className='accordion-header w-100'>
                        <button className={'btn w-100 accordion-button collapsed d-flex px-3 py-2 d-flex align-items-center gap-2' + (select === 'listhh' ? ' ' + 'selected' : '')} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDoiTac" aria-expanded="true" aria-controls="collapseOne"
                            style={{ all: 'unset', cursor: 'pointer' }}
                        ><i className="fa-solid fa-handshake"></i>Đối Tác
                        </button>
                    </div>
                    <div id="collapseDoiTac" className="accordion-collapse collapse mx-3" data-bs-parent="#accordionExample">
                        <div className="accordion-body p-0">
                            <button className={'btn p-0 btn-drop border-0 rounded-0 w-100 text-start' + (select === 'listncc' ? ' ' + 'selected' : '')} onClick={() => { changeRouter('/list-ncc') }}><p className='m-0 w-100 p-2'>Nhà Cung Cấp</p></button>
                            {/* <button className='btn ps-1 py-2 btn-drop border-bottom rounded-0 w-100 text-start' onClick={() => { changeRouter('/list-dichvu') }}>Danh sách Dịch Vụ</button> */}
                            <button className={'btn p-0 btn-drop border-0 rounded-0 w-100 text-start' + (select === 'listkh' ? ' ' + 'selected' : '')} onClick={() => { changeRouter('/list-kh') }}><p className='m-0 w-100 p-2'>Khách Hàng</p></button>
                        </div>
                    </div>
                </div>
            </div>
            {
                userInfor.role === "[ROLE_ADMIN]" &&
                    (
                        <div className={"menu-item frame-view-content d-flex align-items-center" + (select === 'tk' ? ' ' + 'selected' : '')} style={{ color: '#3B7FB9' }}>
                            <button className='w-100 py-2 px-3 d-flex align-items-center gap-2' style={{ all: 'unset', cursor: 'pointer' }} onClick={() => { changeRouter('/list-tk') }}
                            ><i className="fa-solid fa-chart-pie"></i>Thống Kê</button>
                        </div>
                    )
            }



            <div className='mt-auto py-2 d-flex justify-content-between align-items-center px-2 gap-1' style={{ backgroundColor: '#232428', height: '60px' }}>
                <div className='frame-avt rounded-pill border overflow-hidden me-1' style={{ width: '45px', height: '45px', minWidth: '45px', position: 'relative', backgroundColor: 'grey' }}>
                    <p className='d-flex align-items-center justify-content-center m-0 text-white fs-4 fw-bold w-100 h-100 text-center pb-1' style={{ position: 'absolute', top: '0', pointerEvents: 'none' }}>{userInfor.sub[0]}</p>
                </div>
                <div className='frame-info-user' style={{ width: '60%', color: '#F8FAF0' }}>
                    <p className='m-0' style={{ fontSize: '0.7rem' }}>{userInfor.role && userInfor.role === "[ROLE_ADMIN]" ? "Admin" : "Employee"}</p>
                    <p className='m-0 fw-bold' style={{ fontSize: '1rem' }}>{userInfor.sub}</p>
                </div>
                <div className='frame-btn menu-item users d-flex justify-content-end' style={{ minWidth: '85px', width: '30%' }}>
                    <button className='btn p-0' style={{ width: '40px', height: '40px' }}
                        onClick={() => { handleClickLogout() }}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuSide;