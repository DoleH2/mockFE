import MenuSide from "./MenuSide";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from '../../axios/httpRequest';
import { useEffect, useState } from "react";
import Toast from "../utils/Toast";

const AddHDNHPage = () => {
    // xử lý chuyển trang sang url khác
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    // end xử lý chuyển trang

    //lấy dữ liệu nhà cung cấp,sp
    const [listSP, setListSP] = useState([]);
    const [listNCC, setListNCC] = useState([]);
    const [clickSubmit, setClickSubmit] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resultSP = await getRequest("/staff/san_pham/list");
                const resultNCC = await getRequest("/staff/nha_cung_cap");
                setListSP(resultSP);
                setListNCC(resultNCC);
            } catch (error) {
                setToastStatus({ status: 'error', message: error.message });
            }
        };
        fetchApi();
    }, [])
    // end lấy dữ liệu ncc,sp

    //xử lý form
    const { register, handleSubmit, formState: { errors }, setValue, unregister, setError, clearErrors } = useForm();
    ////xử lý khi submit
    const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
    const onSubmit = async (data) => {
        if (listCTHD.length === 0) {
            setError('custom', { message: 'Chua co thong tin ban hang' });
            return;
        }
        listCTHD.map((element, idx) => {
            data.chiTietHoaDonNhapHangDTO[idx].sanPhamDTO.giaVon = element.sanPhamDTO.giaVon
        })

        // dung axios gui
        const fetchApi = async () => {
            try {
                const result = await postRequest("/staff/nhap_hang", data);
                changeRouter("/list-hdnh", { status: 'success', message: 'Thêm thành công' });
            } catch (error) {
                const cloneErr = { ...error.response.data }
                await setErrorField(cloneErr);
                setToastStatus({ status: 'error', message: 'Thêm không thành công' });
                setClickSubmit(true);
            }
        };
        const setErrorField = async (resultInput) => {
            const obj = resultInput || {};
            for (const key in obj) {
                setError(key, {
                    type: "custom",
                    message: obj[key],
                });
            }
        }
        fetchApi();
    }
    //xử lý button add cthd
    const [listCTHD, setListCTHD] = useState([]);
    const handleClickAddCTHD = () => {
        clearErrors("custom");
        const newCTHD = {
            "sanPhamDTO": { "maSanPham": '', "giaVon": '' },
            "soLuong": ''
        }
        // idCTDHRef.current = idCTDHRef.current + 1
        setListCTHD([...listCTHD, newCTHD]);
    }

    const handleChangeInputCTDH = (idx, type, value) => {
        const getListCTDH = [...listCTHD];
        if (type === "maSanPham") {
            getListCTDH[idx].sanPhamDTO[type] = value;
            let spFind = listSP.filter((sp) => Number(sp.maSanPham) === Number(value))
            let editListCTDH = listCTHD;
            editListCTDH[idx].sanPhamDTO.giaVon = spFind[0].giaVon
            setListCTHD([...editListCTDH]);
        } else {
            getListCTDH[idx][type] = value;
        }
        setListCTHD([...getListCTDH]);
    }

    //end xử lý button add cthd
    //xử lý xóa chi tiết đơn hàng


    const handleClickRemoveCTDH = (idx) => {
        unregister(`chiTietHoaDonNhapHangDTO[${listCTHD.length - 1}].sanPhamDTO.maSanPham`)
        unregister(`chiTietHoaDonNhapHangDTO[${listCTHD.length - 1}].soLuong`)
        const newArr = listCTHD.filter((ctdh, index) => index !== idx)
        setListCTHD([...newArr])
    }
    //end xử lý xóa ctdh
    useEffect(() => {
        listCTHD.forEach((element, idx) => {
            setValue("chiTietHoaDonNhapHangDTO[" + idx + "].sanPhamDTO.maSanPham", element.sanPhamDTO.maSanPham !== null ? element.sanPhamDTO.maSanPham : '');
            setValue("chiTietHoaDonNhapHangDTO[" + idx + "].soLuong", element.soLuong !== null ? element.soLuong : '');
        })
    }, [listCTHD])





    // end xử lý form
    return (
        <div className="container-fluid p-0 d-flex bg-white">
            {/* menu side */}
            <MenuSide select="hdbh"></MenuSide>
            {/* end menu side */}
            {/* content */}
            <div className='frame-view-contents w-100 bg-white p-2' style={{ marginLeft: '250px' }}>
                <div className="frame-content border shadow rounded p-2 mx-auto" style={{ width: 'fit-content', backgroundColor: '#f3f3f3' }}>
                    {/* button back */}
                    <button type="button" style={{ maxWidth: '500px', width: 'fit-content' }}
                        className="btn form-control rounded-0 p-1"
                        onClick={() => { changeRouter('/list-hdnh') }}
                    ><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                    {/* end button back */}
                    <div className="title-body justify-content-center border-bottom d-flex">
                        <p className="fs-4 mb-2">Thêm Hóa Đơn Nhập Hàng</p>
                    </div>
                    <div
                        className="container frame-input m-0 rounded px-2 py-1"
                        style={{ width: '700px' }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* frame-input */}
                            <div className="frame-input mb-3 align-items-center">
                                <label htmlFor="tenKhachHang" className="fs-6 fw-bold w-25">Nhà Cung Cấp</label>

                                <select type="text" style={{ maxWidth: '700px' }}
                                    className="form-control"
                                    {...register("maNhaCungCap", {
                                        required: { value: true, message: 'Vui long chon truong nay' }
                                    })}
                                >
                                    <option value="">---Chọn Nhà Cung Cấp---</option>
                                    {
                                        listNCC.map((ncc, idx) => (
                                            <option key={idx} value={ncc.maNhaCungCap}>{ncc.tenNhaCungCap}</option>
                                        ))
                                    }

                                </select>

                                {errors.maNhaCungCap && <p className="text-danger ps-1 m-0">{errors.maNhaCungCap.message}</p>}
                            </div>
                            {/* end frame-input */}

                            <div className="title-kh fs-6 fw-bold border-bottom my-3">
                                Chi Tiết Nhập Hàng
                            </div>

                            {/* chi tiet bán hàng */}
                            <div className="frame-chitiethoadon">
                                <div className="list-cthd">
                                    {
                                        listCTHD.map((element, idx) => (

                                            <div className="frame-ctdh border p-2 mb-2" key={idx}>
                                                <div className="title-ctdh fs-5 fw-bold d-flex justify-content-between">
                                                    <button type="button" className="btn btn-danger p-0 px-1 ms-auto" onClick={() => { handleClickRemoveCTDH(idx) }}>
                                                        <i className="fa-solid fa-x"></i>
                                                    </button>
                                                </div>

                                                <div className="d-flex gap-2">
                                                    <div className="frame-input mb-2" style={{ width: '35%' }}>
                                                        <label htmlFor={"chiTietHoaDonNhapHangDTO[" + idx + "].sanPhamDTO.maSanPham"} className="fs-6 fw-bold">Sản Phẩm</label>
                                                        <select className="form-control"
                                                            {...register("chiTietHoaDonNhapHangDTO[" + idx + "].sanPhamDTO.maSanPham", {
                                                                required: { value: true, message: "Vui lòng chọn sản phẩm" },
                                                                onChange: (e) => { handleChangeInputCTDH(idx, "maSanPham", e.target.value) }
                                                            })}
                                                        >
                                                            <option value="">---Chọn Sản Phẩm---</option>
                                                            {
                                                                listSP.map((sp, idx) =>
                                                                (
                                                                    <option key={idx} value={Number(sp.maSanPham)}>{sp.tenSanPham}</option>
                                                                )
                                                                )
                                                            }
                                                        </select>
                                                        {errors.chiTietHoaDonNhapHangDTO &&
                                                            errors.chiTietHoaDonNhapHangDTO[idx] &&
                                                            errors.chiTietHoaDonNhapHangDTO[idx].sanPhamDTO &&
                                                            errors.chiTietHoaDonNhapHangDTO[idx].sanPhamDTO.maSanPham &&
                                                            <p className="text-danger ps-1 m-0">{errors.chiTietHoaDonNhapHangDTO[idx].sanPhamDTO.maSanPham.message}</p>}
                                                    </div>

                                                    <div className="frame-input mb-2">
                                                        <label htmlFor={`chiTietHoaDonNhapHangDTO[${idx}].soLuong`} className="fs-6 fw-bold">Số Lượng</label>
                                                        <input type="number" id={`chiTietHoaDonNhapHangDTO[${idx}].soLuong`} style={{ maxWidth: '500px' }}
                                                            className="form-control"
                                                            {...register("chiTietHoaDonNhapHangDTO[" + idx + "].soLuong", {
                                                                required: { value: true, message: "Vui lòng nhập số lượng" },
                                                                onChange: (e) => { handleChangeInputCTDH(idx, "soLuong", e.target.value) }
                                                            })}
                                                        />
                                                        {errors.chiTietHoaDonNhapHangDTO &&
                                                            errors.chiTietHoaDonNhapHangDTO[idx] &&
                                                            errors.chiTietHoaDonNhapHangDTO[idx].soLuong && <p className="text-danger ps-1 m-0">{errors.chiTietHoaDonNhapHangDTO[idx].soLuong.message}</p>}
                                                    </div>

                                                    <div className="frame-input mb-2">
                                                        <label htmlFor={`chiTietHoaDonNhapHangDTO[${idx}].sanPhamDTO.giaVon`} className="fs-6 fw-bold">Giá Vốn</label>
                                                        <input type="text" id={`chiTietHoaDonNhapHangDTO[${idx}].sanPhamDTO.giaVon`} style={{ maxWidth: '500px' }}
                                                            className="form-control" disabled={true}
                                                            value={element.sanPhamDTO && element.sanPhamDTO.giaVon || 0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="frame-btn border-bottom py-2 pb-3">
                                    <button type="button" className="btn btn-primary" onClick={handleClickAddCTHD}><i className="fa-solid fa-plus"></i></button>
                                </div>

                            </div>
                            {/* end chi tiết sản phẩm */}

                            <div className="frame-input my-2 mt-4">
                                {(errors.custom && <p className="text-danger m-0">{errors.custom.message}</p>) || (errors.chiTietHoaDonNhapHangDTO && <p className="text-danger m-0">{errors.chiTietHoaDonNhapHangDTO.message}</p>)}
                                <button type="submit" style={{ maxWidth: '500px', width: 'fit-content' }}
                                    disabled={!clickSubmit}
                                    className="btn btn-success form-control px-3 py-2 rounded-0"
                                ><i className="fa-solid fa-plus me-2"></i>Add</button>
                            </div>
                        </form>

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

export default AddHDNHPage;