import MenuSide from "./MenuSide";
import { useForm } from 'react-hook-form';
// import { validateName } from "../../Validate/validateEmp";
import { useNavigate } from "react-router-dom";
import { postRequest } from '../../axios/httpRequest';
import { useRef, useState } from "react";
import Toast from "../utils/Toast";
import { upImg, getImg } from '../../Firebase/configFirebase';
import { configMes } from "../../Validate/validateEmp";


const AddSPPage = () => {
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
        //upload img len firebase
        //set lại imgUrl thành string để gửi json
        const setErrorField = async (resultInput) => {
            const obj = resultInput || {};
            for (const key in obj) {
                setError(key, {
                    type: "custom",
                    message: obj[key],
                });
            }
        }
        const fetchApi = async () => {
            try {
                const nameImg = 'img/product/' + (data.imgUrl[0].name||'');
                const img = data.imgUrl[0];
                data.imgUrl = nameImg;
                const result = await postRequest("/staff/san_pham", data);
                upImg(nameImg, img);
                changeRouter("/list-sanpham", { status: 'success', message: 'Thêm thành công' });
            } catch (error) {
                const cloneErr = { ...error.response.data }
                await setErrorField(cloneErr);
                setToastStatus({ status: 'error', message: error.message });
                setClickSubmit(true);
            }
        };
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
                        onClick={() => { changeRouter('/list-sanpham') }}
                    ><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                    {/* end button back */}
                    <div className="title-body justify-content-center border-bottom d-flex">
                        <p className="fs-4 mb-2">Thêm Sản Phẩm</p>
                    </div>
                    <div
                        className="container frame-input m-0 rounded px-2 py-1"
                        style={{ width: '500px' }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="tenSanPham" className="fs-6 fw-bold">Tên Sản Phẩm<span className="text-danger ms-1">*</span></label>
                                {/* lưu ý đặt name giống với key trong file json */}
                                <input type="text" id="tenSanPham" name="tenSanPham" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    placeholder="Nhập tên sản phẩm"
                                    {...register("tenSanPham", {
                                        required: { value: true, message: configMes.REQ },
                                        pattern:{value:/^[a-zA-Z0-9 ]/,message:configMes.HO_TEN},
                                        maxLength: { value: 50, message: 'Tối đa 50 kí tự' }

                                    })}
                                />
                                {errors.tenSanPham && <p className="text-danger ps-1 m-0">{errors.tenSanPham.message}</p>}
                            </div>
                            {/* end frame-input */}
                            {/* frame-input */}
                            <div className="frame-input mb-2">
                                <label htmlFor="imgUrl" className="fs-6 fw-bold">Ảnh<span className="text-danger ms-1">*</span></label>
                                {/* lưu ý đặt name giống với key trong file json */}
                                <input type="file" id="imgUrl" name="imgUrl" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                    className="form-control"
                                    {...register("imgUrl", {
                                        required: { value: true, message: 'Vui lòng chọn ảnh' },
                                        maxLength: { value: 300, message: 'Tên ảnh quá dài, tối đa 300 kí tự' }
                                    })}
                                />
                                {errors.imgUrl && <p className="text-danger ps-1 m-0">{errors.imgUrl.message}</p>}
                            </div>
                            {/* end frame-input */}
                            <div className="d-flex gap-2">
                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="ram" className="fs-6 fw-bold">RAM<span className="text-danger ms-1">*</span></label>
                                    {/* lưu ý đặt name giống với key trong file json */}
                                    <input type="text" id="ram" name="ram" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập ram"
                                        {...register("ram", {
                                            required: { value: true, message: configMes.REQ },
                                            pattern: { value: /^[0-9]{1,}GB$/, message: 'Format : [0-9]GB' },
                                            maxLength: { value: 10, message: 'Tối đa 10 kí tự' }
                                        })}
                                    />
                                    {errors.ram && <p className="text-danger ps-1 m-0">{errors.ram.message}</p>}
                                </div>
                                {/* end frame-input */}

                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="cpu" className="fs-6 fw-bold">CPU<span className="text-danger ms-1">*</span></label>
                                    {/* lưu ý đặt name giống với key trong file json */}
                                    <input type="text" id="cpu" name="cpu" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập cpu"
                                        {...register("cpu", {
                                            required: { value: true, message: configMes.REQ },
                                            pattern: { value: /^[a-zA-Z0-9 ]{0,}$/, message: 'Chỉ chứa kí tự chữ cái không dấu, số và khoảng trắng' },
                                            maxLength: { value: 20, message: 'Tối đa 20 kí tự' }
                                        })}
                                    />
                                    {errors.cpu && <p className="text-danger ps-1 m-0">{errors.cpu.message}</p>}
                                </div>
                                {/* end frame-input */}
                            </div>

                            <div className="d-flex gap-2">
                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="camera" className="fs-6 fw-bold">Camera<span className="text-danger ms-1">*</span></label>
                                    <input type="text" id="camera" name="camera" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập camera"
                                        {...register("camera", {
                                            required: { value: true, message: configMes.REQ },
                                            pattern: { value: /^[0-9]{1,}MP$/, message: 'Format : [0-9]MP' },
                                            maxLength: { value: 10, message: 'Tối đa 10 kí tự' }
                                        })}
                                    />
                                    {errors.camera && <p className="text-danger ps-1 m-0">{errors.camera.message}</p>}
                                </div>
                                {/* end frame-input */}

                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="mauSac" className="fs-6 fw-bold">Màu Sắc<span className="text-danger ms-1">*</span></label>
                                    <input type="text" id="mauSac" name="mauSac" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập màu sắc"
                                        {...register("mauSac", {
                                            required: { value: true, message: configMes.REQ },
                                            pattern: { value: /^[a-zA-Z0-9 ]{0,}$/, message: 'Chỉ chứa kí tự chữ cái không dấu, số và khoảng trắng' },
                                            maxLength: { value: 20, message: 'Tối đa 20 kí tự' }
                                        })}
                                    />
                                    {errors.mauSac && <p className="text-danger ps-1 m-0">{errors.mauSac.message}</p>}
                                </div>
                                {/* end frame-input */}
                            </div>

                            <div className="d-flex gap-2">
                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="nhanHang" className="fs-6 fw-bold">Nhãn Hàng<span className="text-danger ms-1">*</span></label>
                                    <input type="text" id="nhanHang" name="nhanHang" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập nhãn hàng"
                                        {...register("nhanHang", {
                                            required: { value: true, message: configMes.REQ },
                                            pattern: { value: /^[a-zA-Z0-9 ]{0,}$/, message: 'Chỉ chứa kí tự chữ cái không dấu, số và khoảng trắng' },
                                            maxLength: { value: 50, message: 'Tối đa 50 kí tự' }
                                        })}
                                    />
                                    {errors.nhanHang && <p className="text-danger ps-1 m-0">{errors.nhanHang.message}</p>}
                                </div>
                                {/* end frame-input */}

                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="boNhoTrong" className="fs-6 fw-bold">Bộ nhớ<span className="text-danger ms-1">*</span></label>
                                    <input type="text" id="boNhoTrong" name="boNhoTrong" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập bộ nhớ trong"
                                        {...register("boNhoTrong", {
                                            required: { value: true, message: configMes.REQ },
                                            pattern: { value: /^[0-9]{1,}GB$/,message:'Format [0-9]GB' },
                                            maxLength: { value: 10, message: 'Tối đa 10 kí tự' }
                                        })}
                                    />
                                    {errors.boNhoTrong && <p className="text-danger ps-1 m-0">{errors.boNhoTrong.message}</p>}
                                </div>
                                {/* end frame-input */}
                            </div>

                            <div className="d-flex gap-2">
                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="giaVon" className="fs-6 fw-bold">Giá Vốn<span className="text-danger ms-1">*</span></label>
                                    <input type="number" id="giaVon" name="giaVon" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập giá vốn"
                                        {...register("giaVon", {
                                            required: { value: true, message: 'Vui lòng điền trường này' },
                                            min: { value: 1, message: 'Nhỏ nhất là 1' },
                                            max: { value: 1000000000, message: 'Lớn nhất là 1,000,000,000' }
                                        })}
                                    />
                                    {errors.giaVon && <p className="text-danger ps-1 m-0">{errors.giaVon.message}</p>}
                                </div>
                                {/* end frame-input */}

                                {/* frame-input */}
                                <div className="frame-input mb-2 w-50">
                                    <label htmlFor="giaNiemYet" className="fs-6 fw-bold">Giá Bán<span className="text-danger ms-1">*</span></label>
                                    <input type="number" id="giaNiemYet" name="giaNiemYet" style={{ maxWidth: '500px', background: '#F8FAFC' }}
                                        className="form-control"
                                        placeholder="Nhập giá bán"
                                        {...register("giaNiemYet", {
                                            required: { value: true, message: 'Vui lòng điền trường này' },
                                            min: { value: 1, message: 'Nhỏ nhất là 1' },
                                            max: { value: 1000000000, message: 'Lớn nhất là 1,000,000,000' }
                                        })}
                                    />
                                    {errors.giaNiemYet && <p className="text-danger ps-1 m-0">{errors.giaNiemYet.message}</p>}
                                </div>
                                {/* end frame-input */}
                            </div>

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

export default AddSPPage;