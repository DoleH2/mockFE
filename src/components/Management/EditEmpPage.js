import { useLocation, useNavigate } from "react-router-dom";
import MenuSide from "./MenuSide";

import { useForm } from "react-hook-form";
// import {
//   validateAccount,
//   validateName,
//   validateGioiTinh,
//   validateRepassword
// } from "../../Validate/validateEmp";
import { putRequest } from "../../axios/httpRequest";
import { useEffect, useState } from "react";
import Toast from "../utils/Toast";
import { configMes, validateGioiTinh, validateRepassword } from "../../Validate/validateEmp";
const EditEmpPage = () => {
  // xử lý chuyển trang sang url khác
  let navigate = useNavigate();
  const changeRouter = (path, data) => {
    navigate(path, { state: data });
  }
  // end xử lý chuyển trang
  const location = useLocation();
  const dataDefault = location.state;

  useEffect(() => {
    setValue("maNhanVien", dataDefault.maNhanVien)
    setValue("tenNhanVien", dataDefault.tenNhanVien)
    setValue("ngaySinh", dataDefault.ngaySinh)
    setValue("gioiTinh", dataDefault.gioiTinh)
  }, [])

  const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm();
  const password = watch("password","");
  const gender = watch("gioiTinh", "");
  const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
  const [clickSubmit, setClickSubmit] = useState(true);
  const onSubmit = async (data) => {
    setClickSubmit(false);
    if (data.password === "") {
      data.password = dataDefault.password;
    }
    delete data["repassword"];
    console.log(dataDefault);
    console.log(data);
    // dung axios gui
    const fetchApi = async () => {
      try {
        const result = await putRequest("/admin/nhan_vien", data);
        changeRouter("/list-emp", { status: 'success', message: 'Cập nhật nhân viên thành công, account ' + result.maNhanVien });
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
  };

  return (
    <div className="container-fluid p-0 d-flex bg-white">
      {/* menu side */}
      <MenuSide></MenuSide>
      {/* end menu side */}
      {/* content */}
      <div
        className="frame-view-contents w-100 bg-white p-2"
        style={{ marginLeft: "250px" }}
      >
        <div
          className="frame-content border shadow rounded p-2 mx-auto"
          style={{ width: "fit-content", backgroundColor: "#f3f3f3" }}
        >
          {/* button Quay về */}
          <button
            type="button"
            style={{ maxWidth: "500px", width: "fit-content" }}
            className="btn form-control rounded-0 p-1"
            onClick={() => {
              changeRouter("/list-emp");
            }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>Quay về
          </button>
          {/* end button Quay về */}
          <div className="title-body justify-content-center border-bottom d-flex">
            <p className="fs-4 mb-2">Chỉnh sửa Nhân Viên</p>
          </div>
          <div
            className="container frame-input m-0 rounded px-2 py-1"
            style={{ width: "500px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* frame-input */}
              <div className="frame-input mb-2">
                <label htmlFor="maNhanVien" className="fs-6 fw-bold">
                  Account
                </label>
                <input
                  type="text"
                  id="maNhanVien"
                  name="maNhanVien"
                  style={{ maxWidth: "500px", background: "rgb(219 219 219)" }}
                  disabled={true}
                  className="form-control"
                  {...register("maNhanVien", {

                  })}
                />
              </div>
              {/* end frame-input */}
              {/* frame-input */}
              <div className="frame-input mb-2">
                <label htmlFor="tenNhanVien" className="fs-6 fw-bold">
                  Tên NV<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  id="tenNhanVien"
                  name="tenNhanVien"
                  style={{ maxWidth: "500px", background: "#F8FAFC" }}
                  placeholder="Nhập tên nhân viên"
                  className="form-control"
                  {...register("tenNhanVien", {
                    required: { value: true, message: configMes.REQ },
                    pattern:{value:/^[a-zA-Z0-9 ]/,message:configMes.HO_TEN},
                    maxLength: { value: 50, message: 'Tối đa 50 kí tự' }
                  })}
                />
                {errors.tenNhanVien && (
                  <p className="text-danger ps-1 m-0">
                    {errors.tenNhanVien.message}
                  </p>
                )}
              </div>
              {/* end frame-input */}
              {/* frame-input */}
              <div className="frame-input mb-2">
                <label htmlFor="ngaySinh" className="fs-6 fw-bold">
                  Ngày Sinh<span className="text-danger ms-1">*</span>
                </label>

                <input
                  type="date"
                  id="ngaySinh"
                  name="ngaySinh"
                  style={{ maxWidth: "500px", background: "#F8FAFC" }}
                  className="form-control"
                  {...register("ngaySinh", {
                    required:{value:true,message:configMes.REQ}
                  })}
                />
                {errors.ngaySinh && (
                  <p className="text-danger ps-1 m-0">
                    {errors.ngaySinh.message}
                  </p>
                )}
              </div>
              {/* end frame-input */}

              {/* frame-input */}
              <div className="frame-input mb-2 d-flex flex-wrap gap-1">
                <label htmlFor="gioiTinh" className="fs-6 fw-bold w-100">
                  Giới Tính<span className="text-danger ms-1">*</span>
                </label>

                <div className="frame-radio d-flex gap-1 me-1">
                  <input
                    type="radio"
                    id="nam"
                    value="Nam"
                    style={{ maxWidth: "500px", background: "#F8FAFC" }}
                    className="d-block"
                    {...register("gioiTinh", {
                      validate: validateGioiTinh(gender),
                    })}
                  />
                  <label htmlFor="nam">Nam</label>
                </div>
                <div className="frame-radio d-flex gap-1 me-1">
                  <input
                    type="radio"
                    id="nu"
                    value="Nu"
                    style={{ maxWidth: "500px", background: "#F8FAFC" }}
                    className="d-block"
                    {...register("gioiTinh", {
                      validate: validateGioiTinh(gender),
                    })}
                  />
                  <label htmlFor="nu">Nu</label>
                </div>
                <div className="frame-radio d-flex gap-1 me-1">
                  <input
                    type="radio"
                    id="khac"
                    value="Khac"
                    style={{ maxWidth: "500px", background: "#F8FAFC" }}
                    className="d-block"
                    {...register("gioiTinh", {
                      validate: validateGioiTinh(gender),
                    })}
                  />
                  <label htmlFor="khac">Khac</label>
                </div>
                {errors.gioiTinh && (
                  <p className="text-danger ps-1 w-100 m-0">
                    {errors.gioiTinh.message}
                  </p>
                )}
              </div>
              {/* end frame-input */}

              <div className="frame-input my-2 mt-4 d-flex justify-content-between">
                <button
                  type="submit" disabled={!clickSubmit}
                  style={{ maxWidth: "500px", width: "fit-content" }}
                  className="btn btn-success form-control px-3 py-2 rounded-0"
                >
                  <i className="fa-solid fa-pen fa-sm me-2"></i>Update
                </button>
                <button type="button" className="btn text-primary"
                  onClick={()=>{changeRouter("/editpss-emp/"+dataDefault.maNhanVien,dataDefault.maNhanVien)}}
                >
                  Change password
                </button>
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
  );
};

export default EditEmpPage;
