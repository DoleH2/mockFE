import MenuSide from "./MenuSide";
import { useForm } from 'react-hook-form';
// import { validateAccount, validateName, validateGioiTinh, validateRepassword, validateChucVu } from "../../Validate/validateEmp";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest, putRequest } from '../../axios/httpRequest';
import { useEffect, useRef, useState } from "react";
import Toast from "../utils/Toast";
import { configMes } from "../../Validate/validateEmp";


const EditNCCPage = () => {
    const location = useLocation();
    const dataDefault = location.state;
    // xử lý chuyển trang sang url khác
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    // end xử lý chuyển trang

    //xử lý form
    const { register, handleSubmit, formState: { errors }, setValue,setError } = useForm();
    
    useEffect(() => {
        setValue("maNhaCungCap", dataDefault.maNhaCungCap);
        setValue("tenNhaCungCap", dataDefault.tenNhaCungCap);
        setValue("email", dataDefault.email);
        setValue("soDienThoai", dataDefault.soDienThoai);
        setValue("diaChi", dataDefault.diaChi);
    }, [])
    ////xử lý khi submit
    const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
    const accountRef = useRef();
    const [clickSubmit, setClickSubmit] = useState(true);
    const onSubmit = async (data) => {
        setClickSubmit(false);
        data.maNhaCungCap = dataDefault.maNhaCungCap;

        // dung axios gui
        const fetchApi = async () => {
            try {
                const result = await putRequest(
                    "/staff/nha_cung_cap",
                    data
                );
                changeRouter("/list-ncc", { status: 'success', message: 'Cập nhật nhà cung cấp thành công'});
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
                        onClick={() => { changeRouter('/list-ncc') }}
                    ><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                    {/* end button back */}
                    <div className="title-body justify-content-center border-bottom d-flex">
                        <p className="fs-4 mb-2">Edit Nhà Cung Cấp</p>
                    </div>
                    <div
                        className="container frame-input m-0 rounded px-2 py-1"
                        style={{ width: '500px' }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="maNhaCungCap" className="fs-6 fw-bold">Mã Nhà Cung Cấp</label>
                                <input type="text" ref={accountRef} id="maNhaCungCap" name="maNhaCungCap" style={{ maxWidth: '500px', background: 'rgb(220 220 220)' }}
                                    className="form-control" disabled={true}
                                    {...register("maNhaCungCap", {

                                    })}
                                />
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="tenNhaCungCap" className="fs-6 fw-bold">Tên Nhà Cung Cấp</label>
                                <input type="text" id="tenNhaCungCap" name="tenNhaCungCap" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    {...register("tenNhaCungCap", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9 ]{0,}$/, message: 'Chỉ chứa kí tự chữ cái không dấu, số và khoảng trắng' },
                                        maxLength: { value: 50, message: 'Tối đa 50 kí tự' }
                                    })}
                                />
                                {errors.tenNhaCungCap && <p className="text-danger ps-1 m-0">{errors.tenNhaCungCap.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="email" className="fs-6 fw-bold">Email</label>
                                <input type="email" id="email" name="email" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    {...register("email", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9._%+-]{5,20}@[a-zA-Z0-9.-]{3,10}\.[a-zA-Z]{3,10}$/, message: 'Email có format abcde@xyz.com' }
                                    })}
                                />
                                {errors.email && <p className="text-danger ps-1 m-0">{errors.email.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="soDienThoai" className="fs-6 fw-bold">Số Điện Thoại</label>

                                <input type="text" id="soDienThoai" name="soDienThoai" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    {...register("soDienThoai", {
                                        pattern: { value: /^09[0-9]{8}$/, message: 'SDT theo format 09xxxxxxxx' },
                                        required: { value: true, message: configMes.REQ },
                                        maxLength: { value: 100, message: 'Tối đa 100 kí tự' }
                                    })}
                                />
                                {errors.soDienThoai && <p className="text-danger ps-1 m-0">{errors.soDienThoai.message}</p>}
                            </div>
                            {/* end frame-input */}

                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="diaChi" className="fs-6 fw-bold">Địa Chỉ</label>

                                <input type="text" id="diaChi" name="diaChi" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    {...register("diaChi", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern: { value: /^[a-zA-Z0-9/ ]{1,}$/, message: 'Chỉ chứa chữ cái, khoảng cách, số và dấu /' },
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
                                ><i class="fa-solid fa-pen fa-sm me-2"></i>Update</button>
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

export default EditNCCPage;