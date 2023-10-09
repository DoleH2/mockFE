import { useLocation, useNavigate } from 'react-router-dom';
import MenuSide from './MenuSide';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
// import empJSON from '../../json/employeeJSON.json';
import ReactPaginate from 'react-paginate';
import '../../css/pagingstyle.css'
import { deleteRequest, getRequest } from '../../axios/httpRequest';
import Toast from "../utils/Toast";
import LoadCircle from '../utils/LoadCircle';
import ButtonAdd from '../utils/ButtonAdd';
let empJSON = [];
const ListNVPage = () => {
    //thông báo toast thành công
    const location = useLocation();
    const dataDefault = location.state;
    const [toastStatus, setToastStatus] = useState(dataDefault || { status: '', message: '' });
    // get data, lấy dữ liệu

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadData, setReloadData] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getRequest("/admin/nhan_vien");
                empJSON = result || [];
                setLoading(false);
                setData(empJSON);
            } catch (error) {
                const objErr = JSON.parse(JSON.stringify(error))
                changeRouter("/error", objErr)
            }
        };
        fetchApi();
        // setData(empJSON)
    }, [reloadData])
    // end get data

    // di chuyển sang url khác, chuyển trang
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    //end chuyen trang

    // search
    const [typeSearch, setTypeSearch] = useState([]);
    ////Danh sách các option, value phải khớp với key trong json data
    const options = [
        { value: 'maNhanVien', label: 'Account' },
        { value: 'tenNhanVien', label: 'Ten NV' },
        { value: 'ngaySinh', label: 'Ngay Sinh' },
        { value: 'gioiTinh', label: 'Gioi Tinh' }
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
            setData([...empJSON]);
        } else {
            empJSON.map(emp => {
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
    useEffect(()=>{
        setCurrentPage(0);
        const pagination = document.getElementsByClassName("pagination")[0];
        const liPagination = pagination&&pagination.getElementsByTagName("li")[1];
        if(liPagination){
            liPagination.getElementsByTagName("a")[0].click();
        }

    },[valueSearch])
    ////xử lý khi click sang trang khác
    const handlePageChange = (selectPage) => {
        setCurrentPage(selectPage.selected);
    }
    // end pagination

    //modal delete
    const [accDelete, setAccDelete] = useState();
    ////xử lý khi click vào nút xóa sẽ gửi account vào modal box
    const handleClickDelete = (account) => {
        setAccDelete(account);
    }
    ////xử lý khi click xác nhận xóa ở modal box sẽ xóa account
    const handleConfirmDelete = (account) => {
        const fetchApi = async () => {
            const result = await deleteRequest("/admin/nhan_vien", account);
            setReloadData(pre => !pre);
        };
        fetchApi();
    }
    //end modal delete

    return (
        <div className="container-fluid p-0 d-flex bg-white">
            {/* menu side */}
            <MenuSide select="qlnv"></MenuSide>
            {/* end menu side */}
            {/* content */}
            <div className='frame-view-contents w-100 bg-white p-2' style={{ marginLeft: '300px' }}>
                <div className="frame-content border shadow rounded p-2 mx-auto" style={{ backgroundColor: '#f3f3f3', maxWidth: '1200px', minWidth: '800px' }}>
                    {/* tiêu đề */}
                    <div className="title-body mb-4">
                        <p className="fs-3 mb-0">Quản Lý Nhân Viên</p>
                    </div>
                    {/* end tiêu đề */}
                    {/* hiển thị danh sách */}
                    <div
                        className="frame-input bg-white border mx-auto ml-5 rounded p-0"
                        style={{ width: '100%', minWidth: '250px' }}
                    >
                        <div
                            className="frame-header border-bottom d-flex justify-content-start align-items-center w-100" style={{ height: '40px', backgroundColor: '#b4b4b4' }}>
                            <p className="h6 m-0 p-2">Danh sách nhân viên</p>
                        </div>
                        <div className="frame-btn d-flex gap-3 m-2 justify-content-between">
                            <ButtonAdd
                                onClick={() => { changeRouter('/add-emp') }}
                            />
                            <div className='frame-select-search w-50'>
                                <Select className='form-control border-0 w-100 p-0' options={options}
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
                                <input className='form-control border-0' placeholder='Search...'
                                    onChange={(e) => {
                                        setValueSearch(e.target.value);
                                        handleSubmitSearch(e.target.value, typeSearch)
                                    }}
                                    disabled={typeSearch.length === 0 ? true : false} value={valueSearch} />
                                <div className='d-flex align-items-center justify-content-center px-2 border border-0'><i className="fa-solid fa-magnifying-glass"></i></div>
                            </div>

                        </div>

                        {/* body frame */}
                        <div className="frame-body mb-1 px-2">
                            {/* table */}
                            <table className="table table-bordered table-striped">
                                <thead className='table-light'>
                                    <tr>
                                        <th>#</th>
                                        <th>Account</th>
                                        <th>Tên NV</th>
                                        <th>Ngày Sinh</th>
                                        <th>Giới Tính</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="body-table">
                                    {
                                        loading && (
                                            <tr>
                                                <td colSpan={6}>
                                                    <LoadCircle />
                                                </td>
                                            </tr>
                                        )
                                    }
                                    {
                                        dataDisplay.map((emp, idx) => (
                                            <tr key={idx}>
                                                <td style={{ width: '5%', minWidth: '50px', maxWidth: '100px' }}>{idx}</td>
                                                <td>{emp.maNhanVien}</td>
                                                <td>{emp.tenNhanVien}</td>
                                                <td>{emp.ngaySinh}</td>
                                                <td>{emp.gioiTinh}</td>
                                                <td style={{ width: '10%', minWidth: '100px', maxWidth: '150px' }}>
                                                    <div className="d-flex gap-2">
                                                        <a className="btn btn-light border text-success border-0"
                                                            onClick={() => { changeRouter('/edit-emp/' + emp.maNhanVien, emp) }}
                                                        >
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </a>
                                                        {emp.maNhanVien !== "admin" && 
                                                        <a className="btn btn-light border text-danger border-0" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleClickDelete(emp.maNhanVien) }}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </a>}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {/* end table */}
                            {/* modal confirm xóa */}
                            <div className="modal fade" id="exampleModal" data-delete={accDelete} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận xóa</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p className='m-0'>
                                                Bạn có muốn xóa Nhân Viên {accDelete} ?
                                            </p>
                                            <p className='text-danger'>
                                                Việc xóa sẽ không thể khôi phục
                                            </p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { handleConfirmDelete(accDelete) }}>Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end modal confirm xóa */}
                            {/* phân trang */}
                            <ReactPaginate
                                previousLabel="Previous"
                                nextLabel="Next"
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

export default ListNVPage;