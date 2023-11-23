import MenuSide from './MenuSide';
import { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { getRequest, postRequest } from '../../axios/httpRequest';
import { useNavigate } from 'react-router-dom';
let listTKJSON = [];
const ListThongKePage = () => {
    // di chuyển sang url khác, chuyển trang
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    //end chuyen trang
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    // get data, lấy dữ liệu
    const [data, setData] = useState([]);
    const [typeThongKe, setTypeThongKe] = useState();
    const [typeDataSend, setTypeDataSend] = useState()


    const onSubmit = async (dataSend) => {
        //axios lấy dữ liệu
        setTypeDataSend(dataSend)
        if (dataSend.loaiThongKe === "thongKeSanPham") {
            const fetchApi = async () => {
                const result = await postRequest("/admin/thong_ke", dataSend);
                try {
                    listTKJSON = result || [];
                    setData(listTKJSON.listSanPham || []);
                    setTypeThongKe("thongKeSanPham");
                } catch (error) {
                    const objErr = JSON.parse(JSON.stringify(error))
                    changeRouter("/error", objErr)
                }
            };
            fetchApi();
        } else if (dataSend.loaiThongKe === "thongKeNhanVien") {
            const fetchApi = async () => {
                try {
                    const result = await postRequest("/admin/thong_ke", dataSend);
                    listTKJSON = result || [];
                    setData(listTKJSON.listNhanVien || []);
                    setTypeThongKe("thongKeNhanVien");
                } catch (error) {
                    const objErr = JSON.parse(JSON.stringify(error))
                    changeRouter("/error", objErr)
                }
            };
            fetchApi();
        } else {
            setTypeThongKe("");
        }
    }

    // search
    ////Danh sách các option, value phải khớp với key trong json data
    const [typeSearch, setTypeSearch] = useState('');
    const optionNV = [
        { value: 'maNhanVien', label: 'Mã Nhân Viên' },
        { value: 'tenNhanVien', label: 'Tên Nhân Viên' },
        { value: 'soLuongBan', label: 'Số Lượng Bán Được' },
        { value: 'doanhThu', label: 'Doanh Thu' },
        { value: 'loiNhuan', label: 'Lợi Nhuận' }
    ]
    const optionSP = [
        { value: 'maSanPham', label: 'Mã Sản Phẩm' },
        { value: 'tenSanPham', label: 'Tên Sản Phẩm' },
        { value: 'soLuongBan', label: 'Số Lượng Bán Được' },
        { value: 'doanhThu', label: 'Doanh Thu' },
        { value: 'loiNhuan', label: 'Lợi Nhuận' }
    ]
    ////xử lý khi thay đổi option
    const [valueSearch, setValueSearch] = useState('');
    const handleChangeSearch = (selectOption) => {
        setTypeSearch(selectOption);
        if (selectOption) {
            setValueSearch('');
            handleSubmitSearch('', selectOption);
        } else {
            handleSubmitSearch(valueSearch, selectOption);
        }
    }


    ////xử lý khi thay đổi ô input search sẽ load dữ liệu
    const handleSubmitSearch = (value, types) => {
        let dataShow = [];
        if (types === '') {
            setData(typeThongKe === "thongKeSanPham" ? [...listTKJSON.listSanPham] : [...listTKJSON.listNhanVien]);
        } else {
            (typeThongKe === "thongKeSanPham" ? listTKJSON.listSanPham : listTKJSON.listNhanVien).map(emp => {
                let flag = false;
                const valueCheck = emp[types.value] + ""
                if ((valueCheck.toLowerCase()).indexOf((value.toLowerCase())) >= 0) {
                    flag = true
                }
                if (flag) {
                    dataShow.push(emp);
                }
            })
            setData([...dataShow]);
        }
    }
    // end search
    //sort
    const [fieldSort, setFieldSort] = useState("loiNhuan");
    const [typeSort, setTypeSort] = useState(true);

    const handleSort = (field) => {
        if (fieldSort === field) {
            if (typeSort) {
                data.sort((a, b) => a[field] - b[field]);
                setTypeSort(false);
            } else {
                data.sort((a, b) => -(a[field] - b[field]));
                setTypeSort(true);
            }
        } else {
            data.sort((a, b) => a[field] - b[field]);
            setTypeSort(false);
        }
        setFieldSort(field);
        setData([...data]);
    }
    //end sort



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
    useEffect(() => {
        setCurrentPage(0);
        const listPaging = document.getElementsByClassName('pagination')[0];
        const pageOne = listPaging && listPaging.getElementsByTagName('li')[1];
        if (pageOne) {
            pageOne.getElementsByTagName('a')[0].click();
        }
    }, [data])
    ////xử lý khi click sang trang khác
    const handlePageChange = (selectPage) => {
        setCurrentPage(selectPage.selected);
    }
    // end pagination

    return (
        <div className="container-fluid p-0 d-flex bg-white">
            {/* menu side */}
            <MenuSide select="tk"></MenuSide>
            {/* end menu side */}
            {/* content */}
            <div className='frame-view-contents w-100 bg-white p-2' style={{ marginLeft: '300px' }}>
                <div className="frame-content border shadow rounded p-2 mx-auto" style={{ backgroundColor: '#f3f3f3', maxWidth: '1200px', minWidth: '800px' }}>
                    <div className="title-body mb-4">
                        <p className="fs-3 mb-0">Thống Kê</p>
                    </div>
                    <div
                        className="frame-input bg-white border mx-auto ml-5 rounded p-0"
                        style={{ width: '100%', minWidth: '250px' }}
                    >
                        <div
                            className="frame-header border-bottom d-flex justify-content-start align-items-center w-100 rounded-top" style={{ height: '40px', backgroundColor: '#b4b4b4' }}>
                            <p className="h6 m-0 p-2">Danh sách Thống Kê</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='border-bottom'>
                            <div className='frame-select-date d-flex gap-2 align-items-start m-2'>
                                <div className='d-flex w-25 align-items-center gap-1 flex-wrap align-items-start'>
                                    <p className='m-0'>Từ</p>
                                    <input type='date' className='form-control'
                                        {...register("thoiGianBatDau", {
                                            required: { value: true, message: "Vui lòng điền ô này" }
                                        })}
                                    />
                                    {errors.thoiGianBatDau && <p className='text-danger m-0 w-100'>{errors.thoiGianBatDau.message}</p>}
                                </div>
                                <div className='d-flex w-25 align-items-center gap-1 flex-wrap align-items-start'>
                                    <p className='m-0'>Đến</p>
                                    <input type='date' className='form-control'
                                        {...register("thoiGianKetThuc", {
                                            required: { value: true, message: "Vui lòng điền ô này" }
                                        })}
                                    />
                                    {errors.thoiGianKetThuc && <p className='text-danger m-0 w-100'>{errors.thoiGianKetThuc.message}</p>}
                                </div>

                            </div>
                            <div className='frame-select-data d-flex m-2 gap-2'>
                                <select className='form-control w-50'
                                    {...register("loaiThongKe", {

                                    })}
                                >
                                    <option value="thongKeSanPham">Thống Kê theo Sản Phẩm</option>
                                    <option value="thongKeNhanVien">Thống Kê theo Nhân Viên</option>
                                </select>
                                <button type='submit' className='btn btn-primary'>Xem</button>
                            </div>
                        </form>

                        <div className='frame-stats m-2'>
                            <p>Tổng Số lượng sản phẩm bán:
                                <span className='fw-bold px-1'>
                                    {listTKJSON.tongSoLuong !== 0 && listTKJSON.tongSoLuong ? Number(listTKJSON.tongSoLuong).toLocaleString() : 0}
                                </span>
                            </p>
                            <p>Tổng Doanh thu:
                                <span className='fw-bold px-1'>
                                    {(Number(listTKJSON.tongDoanhThu)) === 0 || !listTKJSON.tongDoanhThu ?
                                        0 : (Number(listTKJSON.tongDoanhThu)).toLocaleString()}
                                </span>
                                VND</p>
                            <p>Tổng Lợi nhuận:
                                <span className='fw-bold px-1'>
                                    {(Number(listTKJSON.tongLoiNhuan)) === 0 || !listTKJSON.tongLoiNhuan ? 0 : (Number(listTKJSON.tongLoiNhuan)).toLocaleString()}
                                </span>
                                VND</p>
                        </div>
                        <div className="frame-btn d-flex gap-3 m-2 justify-content-between">
                            {/* frame select search */}
                            <div className='frame-select-search w-50'>
                                <Select placeholder="Chọn mục tìm kiếm" className='form-control border-0 w-100 p-0'
                                    options={typeThongKe === "thongKeSanPham" ? optionSP : typeThongKe === "thongKeNhanVien" ? optionNV : []}
                                    value={typeSearch}
                                    onChange={handleChangeSearch}
                                />
                            </div>
                            {/* end frame select search */}
                            <div className='frame-search d-flex rounded border'>
                                <input className='form-control border-0' placeholder='Tìm kiếm'
                                    onChange={(e) => {
                                        setValueSearch(e.target.value);
                                        handleSubmitSearch(e.target.value, typeSearch)
                                    }}
                                    disabled={typeSearch === '' ? true : false} value={valueSearch} />
                                <div className='d-flex align-items-center justify-content-center px-2 border border-0'><i className="fa-solid fa-magnifying-glass"></i></div>
                            </div>

                        </div>
                        <div className="frame-body mb-1 px-2">
                            <div className='frame-date'>
                                {
                                    typeDataSend && <p className='m-0 fw-bold'>Dữ liệu từ ngày {typeDataSend.thoiGianBatDau} đến {typeDataSend.thoiGianKetThuc}</p>
                                }
                            </div>
                            <table className="table table-bordered table-striped">
                                <thead className='table-light'>
                                    {
                                        typeThongKe === "thongKeSanPham" ? (
                                            <tr>
                                                <th>Mã SP</th>
                                                <th style={{ width: '30%' }}>Tên Sản Phẩm</th>
                                                <th style={{ width: '15%' }}>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <p className='m-0'>Số Lượng Bán Được</p>
                                                        <button className='btn btn-light' onClick={() => { handleSort("soLuongBan") }}><i className="fa-solid fa-filter"></i></button>
                                                    </div>
                                                </th>
                                                <th>Doanh Thu</th>
                                                <th>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <p className='m-0'>Lợi Nhuận</p>
                                                        <button className='btn btn-light' onClick={() => { handleSort("loiNhuan") }}><i className="fa-solid fa-filter"></i></button>
                                                    </div>
                                                </th>
                                            </tr>
                                        ) : typeThongKe === "thongKeNhanVien" ? (
                                            <tr>
                                                <th>Account</th>
                                                <th style={{ width: '30%' }}>Tên Nhân Viên</th>
                                                <th style={{ width: '15%' }}>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <p className='m-0'>Số Lượng Bán Được</p>
                                                        <button className='btn btn-light' onClick={() => { handleSort("soLuongBan") }}><i className="fa-solid fa-filter"></i></button>
                                                    </div>
                                                </th>
                                                <th>Doanh Thu</th>
                                                <th>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <p className='m-0'>Lợi Nhuận</p>
                                                        <button className='btn btn-light' onClick={() => { handleSort("loiNhuan") }}><i className="fa-solid fa-filter"></i></button>
                                                    </div>
                                                </th>
                                            </tr>
                                        ) : (
                                            <tr></tr>
                                        )
                                    }
                                </thead>
                                <tbody id="body-table">
                                    {
                                        dataDisplay.map((hd, idx) => (
                                            <tr key={idx}>
                                                <td className='text-center' style={{ width: '10%' }}>
                                                    {typeThongKe === "thongKeSanPham" ? hd.maSanPham : hd.maNhanVien}
                                                </td>
                                                <td style={{ width: '10%' }}>
                                                    {typeThongKe === "thongKeSanPham" ? hd.tenSanPham : hd.tenNhanVien}
                                                </td>
                                                <td className='text-end'>
                                                    {hd.soLuongBan.toLocaleString()}
                                                </td>
                                                <td className='text-end'>
                                                    {hd.doanhThu.toLocaleString()}
                                                </td>
                                                <td className='text-end'>
                                                    {hd.loiNhuan.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>

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
        </div>

    )
}

export default ListThongKePage;