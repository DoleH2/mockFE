import { useLocation, useNavigate } from 'react-router-dom';
import MenuSide from './MenuSide';
import { useEffect, useState } from 'react';
// import hdNhapHangJSON from '../../json/hoadonNHJSON.json';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { getRequest } from '../../axios/httpRequest';
import Toast from "../utils/Toast";
import LoadCircle from '../utils/LoadCircle';
import moment from 'moment';
import ButtonAdd from '../utils/ButtonAdd';

let hdNhapHangJSON = [];
const ListHoaDonNHPage = () => {
    //thông báo toast thành công
    const location = useLocation();
    const dataDefault = location.state;
    const [toastStatus, setToastStatus] = useState(dataDefault || { status: '', message: '' });
    const [loading, setLoading] = useState(true);
    // di chuyển sang url khác, chuyển trang
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    //end chuyen trang
    // get data, lấy dữ liệu
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getRequest("/staff/nhap_hang");
                setLoading(false);
                hdNhapHangJSON = result;
                setData(result || []);
            } catch (error) {
                const objErr = JSON.parse(JSON.stringify(error))
                changeRouter("/error", objErr)
            }
        };
        fetchApi();
    }, [])
    // end get data

    // search
    const [typeSearch, setTypeSearch] = useState([]);
    ////Danh sách các option, value phải khớp với key trong json data
    const options = [
        { value: 'maHoaDonNhapHang', label: 'Mã HĐ Nhập Hàng' },
        { value: 'tenNhaCungCap', label: 'Tên Nhà Cung Cấp' },
        { value: 'thoiGianNhapHang', label: 'Thời Gian Nhập Hàng' },
        { value: 'tongHoaDon', label: 'Tổng Hóa Đơn' }
    ]
    ////xử lý khi thay đổi option
    const [valueSearch, setValueSearch] = useState('');
    const handleChangeSearch = (selectOption) => {
        setTypeSearch([...selectOption]);
        if (selectOption.length === 0) {
            setValueSearch('');
            handleSubmitSearch('', selectOption);
        } else {
            handleSubmitSearch(valueSearch, selectOption);
        }
    }

    ////xử lý khi thay đổi ô input search sẽ load dữ liệu
    const handleSubmitSearch = (value, types) => {
        let dataShow = [];
        if (types.length === 0) {
            setData([...hdNhapHangJSON]);
        } else {
            hdNhapHangJSON.map(emp => {
                let flag = false;
                types.map(type => {
                    const valueCheck = emp[type.value] + ""
                    if ((valueCheck.toLowerCase()).indexOf((value.toLowerCase())) >= 0) {
                        flag = true
                    }
                })
                if (flag) {
                    dataShow.push(emp);
                }
            })
            setData([...dataShow]);
        }
    }
    // end search
    // pagination
    ////số dữ liệu muốn hiện mỗi trang
    const rowsPerPage = 5
    const [currentPage, setCurrentPage] = useState(0)
    const [dataDisplay, setDataDisplay] = useState([]);
    ////tính toán tổng số trang
    const pageCount = Math.ceil(data.length / rowsPerPage);
    ////xử lý dữ liệu của mỗi trang
    useEffect(() => {
        const index = currentPage * rowsPerPage;
        const curDataPage = data.slice(index, index + rowsPerPage);
        setDataDisplay([...curDataPage]);
    }, [currentPage, data])
    useEffect(() => {
        setCurrentPage(0);
        const pagination = document.getElementsByClassName("pagination")[0];
        const liPagination = pagination && pagination.getElementsByTagName("li")[1];
        if (liPagination) {
            liPagination.getElementsByTagName("a")[0].click();
        }

    }, [valueSearch])
    ////xử lý khi click sang trang khác
    const handlePageChange = (selectPage) => {
        setCurrentPage(selectPage.selected);
    }
    // end pagination

    //modal info HD
    const [dataInfoHD, setDataInfoHD] = useState([]);
    const [maHDNH, setMaHDNH] = useState();
    const handleClickInfo = (maHD, info) => {
        setMaHDNH(maHD);
        setDataInfoHD(info);
    }
    //end modal info HD

    return (
        <div className="container-fluid p-0 d-flex bg-white">
            {/* menu side */}
            <MenuSide select="listnh"></MenuSide>
            {/* end menu side */}
            {/* content */}
            <div className='frame-view-contents w-100 bg-white p-2' style={{ marginLeft: '300px' }}>
                <div className="frame-content border shadow rounded p-2 mx-auto" style={{ backgroundColor: '#f3f3f3', maxWidth: '1200px', minWidth: '800px' }}>
                    <div className="title-body mb-4">
                        <p className="fs-3 mb-0">Quản Lý Nhập Hàng</p>
                    </div>
                    <div
                        className="frame-input bg-white border mx-auto ml-5 rounded p-0"
                        style={{ width: '100%', minWidth: '250px' }}
                    >
                        <div
                            className="frame-header border-bottom d-flex justify-content-start align-items-center w-100" style={{ height: '40px', backgroundColor: '#b4b4b4' }}>
                            <p className="h6 m-0 p-2">Danh sách Hóa Đơn Nhập Hàng</p>
                        </div>
                        <div className="frame-btn d-flex gap-2 m-2 justify-content-between">
                            <ButtonAdd
                                onClick={() => { changeRouter('/add-hdnh') }}
                            />
                            {/* frame select search */}
                            <div className='frame-select-search w-50'>
                                <Select placeholder="Chọn mục tìm kiếm" className='form-control border-0 w-100 p-0' options={options}
                                    isMulti
                                    value={typeSearch}
                                    onChange={handleChangeSearch}
                                    styles={{
                                        multiValue: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#93b5ff',
                                        }),
                                        multiValueRemove: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: '#93b5ff !important'
                                        })

                                    }}
                                />
                            </div>
                            {/* end frame select search */}
                            <div className='frame-search d-flex rounded border'>
                                <input className='form-control border-0' placeholder='Tìm kiếm'
                                    onChange={(e) => {
                                        setValueSearch(e.target.value);
                                        handleSubmitSearch(e.target.value, typeSearch)
                                    }}
                                    disabled={typeSearch.length === 0 ? true : false} value={valueSearch} />
                                <div className='d-flex align-items-center justify-content-center px-2 border border-0'><i className="fa-solid fa-magnifying-glass"></i></div>
                            </div>

                        </div>
                        <div className="frame-body mb-1 px-2">
                            <table className="table table-bordered table-striped">
                                <thead className='table-light'>
                                    <tr>
                                        <th style={{ width: '10%' }}>Mã Hóa Đơn</th>
                                        <th style={{ width: '25%' }}>Tên Nhà Cung Cấp</th>
                                        <th>Thời Gian</th>
                                        <th>Tổng Hóa Đơn</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="body-table">
                                    {
                                        loading && (
                                            <tr>
                                                <td colSpan={5}>
                                                    <LoadCircle />

                                                </td>
                                            </tr>
                                        )
                                    }
                                    {
                                        dataDisplay.map((hd, idx) => (
                                            <tr key={idx}>
                                                <td className='text-end' style={{ width: '10%' }}>{hd.maHoaDonNhapHang}</td>
                                                <td style={{ width: '10%' }}>{hd.tenNhaCungCap}</td>
                                                <td className='text-center'>{moment(hd.thoiGianNhapHang).format('DD-MM-yyyy HH:mm:ss')}</td>
                                                <td className='text-end'>{(hd.tongHoaDon).toLocaleString()}</td>
                                                <td style={{ width: '10%', minWidth: '100px', maxWidth: '150px' }}>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <button className="btn btn-light border border-0 px-3"
                                                            data-bs-toggle="modal" data-bs-target="#exampleModal1"
                                                            // onClick={() => { handleClickInfo(hd.maHoaDonNhapHang, hd.maChiTietHoaDonNhapHangDTO) }}
                                                            onClick={() => { handleClickInfo(hd.maHoaDonNhapHang, hd) }}
                                                        >
                                                            <i className="fa-solid fa-info"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            {/* modal info hoa don */}
                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" style={{ minWidth: '600px', width: '50%' }}>
                                    <div className="modal-content w-100">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chi tiết hóa đơn {maHDNH}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <table className='table table-bordered table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '20%' }}>Mã CTHD Nhập Hàng</th>
                                                        <th style={{ width: '20%' }}>Tên Sản Phẩm</th>
                                                        <th>Số Lượng</th>
                                                        <th>Đơn Giá</th>
                                                        <th>Thành Tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataInfoHD.chiTietHoaDonNhapHangDTO &&
                                                        dataInfoHD.chiTietHoaDonNhapHangDTO.length > 0 &&
                                                        dataInfoHD.chiTietHoaDonNhapHangDTO.map((info, idx) => (
                                                            <tr key={idx}>
                                                                <td className='text-end'>{info.maChiTietHoaDonNhapHang}</td>
                                                                <td>{info.sanPhamDTO.tenSanPham}</td>
                                                                <td className='text-end'>{Number(info.soLuong).toLocaleString()}</td>
                                                                <td className='text-end'>{Number(info.sanPhamDTO.giaVon).toLocaleString()}</td>
                                                                <td className='text-end'>{(Number(info.sanPhamDTO.giaVon) * Number(info.soLuong)).toLocaleString()}</td>
                                                            </tr>

                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                            <div className='frame-tong-cong text-end'>
                                                Tổng cộng : <span className='fw-bold'>{Number(dataInfoHD.tongHoaDon).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end modal info hoa don */}
                            {/* phân trang */}
                            <ReactPaginate
                                previousLabel="<"
                                nextLabel=">"
                                breakLabel={'...'}
                                // pageRangeDisplayed={3}
                                marginPagesDisplayed={1}//số trang hiển thị bên trái và phải của trang đang chọn
                                pageCount={pageCount}//tổng số trang
                                onPageChange={handlePageChange}//khi click sang trang xác sẽ xử lý
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* end content */}
            <Toast
                toastStatus={toastStatus.status}
                message={toastStatus.message}
                onClose={() => setToastStatus('')}
            />
        </div>

    )
}

export default ListHoaDonNHPage;