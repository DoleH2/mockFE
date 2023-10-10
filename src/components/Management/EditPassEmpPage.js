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
const EditPassEmpPage = () => {

  // xử lý chuyển trang sang url khác
  let navigate = useNavigate();
  const changeRouter = (path, data) => {
    navigate(path, { state: data });
  }
  // end xử lý chuyển trang
  const location = useLocation();
  const dataDefault = location.state;
  useEffect(() => {
    setValue("maNhanVien", dataDefault)
  }, [])

  const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm();
  const password = watch("password", "");
  const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
  const [clickSubmit, setClickSubmit] = useState(true);
  const onSubmit = async (data) => {
    setClickSubmit(false);
    // dung axios gui
    console.log(data);
    const fetchApi = async () => {
      try {
        const result = await putRequest("/admin/nhan_vien", data);
        changeRouter("/list-emp", { status: 'success', message: 'Cập nhật mật khẩu thành công, account ' + result.maNhanVien });
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
          {/* button back */}
          <button
            type="button"
            style={{ maxWidth: "500px", width: "fit-content" }}
            className="btn form-control rounded-0 p-1"
            onClick={() => {
              changeRouter("/list-emp");
            }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>Back
          </button>
          {/* end button back */}
          <div className="title-body justify-content-center border-bottom d-flex">
            <p className="fs-4 mb-2">Edit Password Nhân Viên</p>
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

              {/* frame-input password vs repassword */}
              <div className="frame-input mb-2 w-100">
                <label htmlFor="password" className="fs-6 fw-bold">
                  Password<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  style={{ maxWidth: "500px", background: "#F8FAFC" }}
                  placeholder="Nhập mật khẩu mới"
                  className="form-control"
                  {...register("password", {
                    required:{value:true,message:configMes.REQ},
                    maxLength: { value: 20, message: "Toi da 20 ki tu" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                      message:
                        "Ít nhất 1 chữ hoa, 1 chữ thường và 1 số. Độ dài ít nhất 8 kí tự",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger ps-1 m-0">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* end frame-input */}
              {/* frame-input */}
              <div className="frame-input mb-2 w-100">
                <label htmlFor="rePassword" className="fs-6 fw-bold">
                  Re-Password<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="password"
                  id="repassword"
                  name="repassword"
                  placeholder="Nhập lại mật khẩu mới"
                  style={{ maxWidth: "500px", background: "#F8FAFC" }}
                  className="form-control"
                  {...register("repassword", {
                    required:{value:true,message:configMes.REQ},
                    validate: (value) => validateRepassword(password, value),
                  })}
                />
                {errors.repassword && (
                  <p className="text-danger ps-1 m-0">
                    {errors.repassword.message}
                  </p>
                )}
              </div>
              {/* end frame-input */}

              <div className="frame-input my-2 mt-4">
                <button
                  type="submit" disabled={!clickSubmit}
                  style={{ maxWidth: "500px", width: "fit-content" }}
                  className="btn btn-success form-control px-3 py-2 rounded-0"
                >
                  <i className="fa-solid fa-pen fa-sm me-2"></i>Update
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

export default EditPassEmpPage;
