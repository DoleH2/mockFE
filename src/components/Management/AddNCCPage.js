import MenuSide from "./MenuSide";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { postRequest } from '../../axios/httpRequest';
import { useRef, useState } from "react";
import Toast from "../utils/Toast";
import { configMes } from "../../Validate/validateEmp";


const AddNCCPage = () => {
    // xử lý chuyển trang sang url khác
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    // end xử lý chuyển trang

    //xử lý form
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    ////xử lý khi submit
    const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
    const accountRef = useRef();
    const [clickSubmit, setClickSubmit] = useState(true);
    const onSubmit = async (data) => {
        // dung axios gui
        setClickSubmit(false);
        const fetchApi = async () => {
            try {
                const result = await postRequest(
                    "/staff/nha_cung_cap",
                    data
                );
                changeRouter("/list-ncc", { status: 'success', message: 'Thêm nhà cung cấp thành công' });
            } catch (error) {
                console.log(error);
                const cloneErr = { ...error.response.data }
                await setErrorField(cloneErr);
                setToastStatus({ status: 'error', message: error.message })
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
                    {/* button Quay về */}
                    <button type="button" style={{ maxWidth: '500px', width: 'fit-content' }}
                        className="btn form-control rounded-0 p-1"
                        onClick={() => { changeRouter('/list-ncc') }}
                    ><i className="fa-solid fa-arrow-left me-2"></i>Quay về</button>
                    {/* end button Quay về */}
                    <div className="title-body justify-content-center border-bottom d-flex">
                        <p className="fs-4 mb-2">Thêm Nhà Cung Cấp</p>
                    </div>
                    <div
                        className="container frame-input m-0 rounded px-2 py-1"
                        style={{ width: '500px' }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="tenNhaCungCap" className="fs-6 fw-bold">Tên Nhà Cung Cấp<span className="text-danger ms-1">*</span></label>
                                {/* lưu ý đặt name giống với key trong file json */}
                                <input type="text" id="tenNhaCungCap" name="tenNhaCungCap" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    placeholder="Nhập tên nhà cung cấp"
                                    {...register("tenNhaCungCap", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9 ]{0,}$/, message: configMes.HO_TEN },
                                        maxLength: { value: 50, message: 'Toi da 50 ki tu' }
                                    })}
                                />
                                {errors.tenNhaCungCap && <p className="text-danger ps-1 m-0">{errors.tenNhaCungCap.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="email" className="fs-6 fw-bold">Email<span className="text-danger ms-1">*</span></label>

                                <input type="email" id="email" name="email" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    placeholder="Nhập email nhà cung cấp"
                                    {...register("email", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9._%+-]{5,20}@[a-zA-Z0-9.-]{3,10}\.[a-zA-Z]{3,10}$/, message: 'Email có format abcde@xyz.jqk' },
                                        maxLength: { value: 100, message: 'Toi da 100 ki tu' }
                                    })}
                                />
                                {errors.email && <p className="text-danger ps-1 m-0">{errors.email.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="soDienThoai" className="fs-6 fw-bold">Số Điện Thoại<span className="text-danger ms-1">*</span></label>

                                <input type="text" id="soDienThoai" name="soDienThoai" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    placeholder="Nhập số điện thoại nhà cung cấp"
                                    {...register("soDienThoai", {
                                        pattern: { value: /^09[0-9]{8}$/, message: 'SDT theo format 09xxxxxxxx, x là số từ 0-9' },
                                        required: { value: true, message: configMes.REQ }
                                    })}
                                />
                                {errors.soDienThoai && <p className="text-danger ps-1 m-0">{errors.soDienThoai.message}</p>}
                            </div>
                            {/* end frame-input */}

                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="diaChi" className="fs-6 fw-bold">Địa Chỉ<span className="text-danger ms-1">*</span></label>

                                <input type="text" id="diaChi" name="diaChi" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    placeholder="Nhập địa chỉ nhà cung cấp"
                                    {...register("diaChi", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9 /]{0,}$/, message: 'Chỉ chứa chữ cái, khoảng cách, số và dấu /' },
                                        maxLength: { value: 100, message: 'Tối đa 100 kí tự' }
                                    })}
                                />
                                {errors.diaChi && <p className="text-danger ps-1 m-0">{errors.diaChi.message}</p>}
                            </div>
                            {/* end frame-input */}

                            {/* end frame-input */}
                            <div className="frame-input my-2 mt-4">
                                <button type="submit" style={{ maxWidth: '500px', width: 'fit-content' }}
                                    disabled={!clickSubmit}
                                    className="btn btn-success form-control px-3 py-2 rounded-0"
                                ><i className="fa-solid fa-plus me-2"></i>Thêm</button>
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

export default AddNCCPage;