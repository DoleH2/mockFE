import MenuSide from "./MenuSide";
import { useForm } from 'react-hook-form';
// import { validateAccount, validateName, validateGioiTinh, validateRepassword, validateChucVu } from "../../Validate/validateEmp";
import { useNavigate } from "react-router-dom";
import { postRequest } from '../../axios/httpRequest';
import { useState } from "react";
import Toast from "../utils/Toast";
import { configMes, validateGioiTinh } from "../../Validate/validateEmp";


const AddKHPage = () => {
    // xử lý chuyển trang sang url khác
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    // end xử lý chuyển trang

    //xử lý form
    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
    ////xử lý khi submit
    const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
    const gender = watch("gioiTinh");
    
    const [clickSubmit, setClickSubmit] = useState(true);
    const onSubmit = async (data) => {
        // dung axios gui
        setClickSubmit(false);
        const fetchApi = async () => {
            try {
                const result = await postRequest(
                    "/staff/khach_hang",
                    data
                );
                changeRouter("/list-kh", { status: 'success', message: 'Thêm thành công' });
            } catch (error) {
                const cloneErr = { ...error.response.data }
                await setErrorField(cloneErr);
                setToastStatus({ status: 'error', message: error.message });
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
    // end xử lý form
    return (
        <div className="container-fluid p-0 d-flex bg-white">
            {/* menu side */}
            <MenuSide></MenuSide>
            {/* end menu side */}
            {/* content */}
            <div className='frame-view-contents w-100 bg-white p-2' style={{ marginLeft: '250px' }}>
                <div className="frame-content border shadow rounded p-2 mx-auto" style={{ width: 'fit-content', backgroundColor: '#f3f3f3' }}>
                    {/* button back */}
                    <button type="button" style={{ maxWidth: '500px', width: 'fit-content' }}
                        className="btn form-control rounded-0 p-1"
                        onClick={() => { changeRouter('/list-kh') }}
                    ><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                    {/* end button back */}
                    <div className="title-body justify-content-center border-bottom d-flex">
                        <p className="fs-4 mb-2">Thêm Khách Hàng</p>
                    </div>
                    <div
                        className="container frame-input m-0 rounded px-2 py-1"
                        style={{ width: '500px' }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="tenKhachHang" className="fs-6 fw-bold">Tên Khách Hàng</label>
                                {/* lưu ý đặt name giống với key trong file json */}
                                <input type="text" id="tenKhachHang" name="tenKhachHang" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    // lưu ý đặt biến sau ...register("key trong json")
                                    {...register("tenKhachHang", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9 ]{0,}$/, message: 'Chỉ chứa kí tự chữ cái không dấu, số và khoảng trắng' },
                                        maxLength: { value: 50, message: 'Tối đa 50 kí tự' }
                                    })}
                                />
                                {errors.tenKhachHang && <p className="text-danger ps-1 m-0">{errors.tenKhachHang.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="ngaySinh" className="fs-6 fw-bold">Ngày Sinh</label>

                                <input type="date" id="ngaySinh" name="ngaySinh" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    {...register("ngaySinh", {
                                    })}
                                />
                                {errors.ngaySinh && <p className="text-danger ps-1 m-0">{errors.ngaySinh.message}</p>}
                            </div>
                            {/* end frame-input */}

                            {/* frame-input */}
                            <div className="frame-input mb-2 d-flex flex-wrap gap-1">
                                <label htmlFor="gioiTinh" className="fs-6 fw-bold w-100">Giới Tính</label>
                                {/* ô radio */}
                                <div className="frame-radio d-flex gap-1">
                                    <input type="radio" id="nam"
                                        value="Nam" name="gioiTinh" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="d-block"
                                        {...register("gioiTinh", {
                                            validate: validateGioiTinh(gender)
                                        })}
                                    />
                                    <label htmlFor="nam">Nam</label>
                                </div>
                                {/* end radio */}
                                {/* radio */}
                                <div className="frame-radio d-flex gap-1">
                                    <input type="radio" id="nu"
                                        value="Nu" name="gioiTinh" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="d-block"
                                        {...register("gioiTinh", {
                                            validate: validateGioiTinh(gender)
                                        })}
                                    />
                                    <label htmlFor="nu">Nu</label>
                                </div>
                                {/* end radio */}
                                {/* radio */}
                                <div className="frame-radio d-flex gap-1">
                                    <input type="radio" id="khac"
                                        value="Khac" name="gioiTinh" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="d-block"
                                        {...register("gioiTinh", {
                                            validate: validateGioiTinh(gender)
                                        })}
                                    />
                                    <label htmlFor="khac">Khac</label>
                                </div>
                                {/* end radio */}
                                {/* hiện lỗi */}
                                {errors.gioiTinh && <p className="text-danger ps-1 w-100 m-0">{errors.gioiTinh.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="soDienThoai" className="fs-6 fw-bold">Số Điện Thoại</label>
                                {/* lưu ý đặt name giống với key trong file json */}
                                <input type="text" id="soDienThoai" name="soDienThoai" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    // lưu ý đặt biến sau ...register("key trong json")
                                    {...register("soDienThoai", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^09[0-9]{8}$/, message: 'SDT theo format 09xxxxxxxx' }
                                    })}
                                />
                                {errors.soDienThoai && <p className="text-danger ps-1 m-0">{errors.soDienThoai.message}</p>}
                            </div>
                            {/* end frame-input */}


                            <div className="frame-input my-2 mt-4">

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

export default AddKHPage;