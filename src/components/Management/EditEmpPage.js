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
import { configMes, validateGioiTinh } from "../../Validate/validateEmp";
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
  const password = watch("matKhau", "");
  const gender = watch("gioiTinh", "");
  const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
  const [clickSubmit, setClickSubmit] = useState(true);
  const onSubmit = async (data) => {
    setClickSubmit(false);
    if (data.matKhau === "") {
      data.matKhau = dataDefault.matKhau;
    }
    delete data["repassword"];

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
            <p className="fs-4 mb-2">Edit Nhân Viên</p>
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
                  Tên NV
                </label>
                <input
                  type="text"
                  id="tenNhanVien"
                  name="tenNhanVien"
                  style={{ maxWidth: "500px", background: "#F8FAFC" }}
                  className="form-control"
                  {...register("tenNhanVien", {
                    required: { value: true, message: configMes.REQ },
                    maxLength: { value: 50, message: 'Tối đa 50 kí tự' },
                    pattern: { value: /^[A-Za-z\s]{1,}$/, message: configMes.HO_TEN }
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
                  Ngày Sinh
                </label>

                <input
                  type="date"
                  id="ngaySinh"
                  name="ngaySinh"
                  style={{ maxWidth: "500px", background: "#F8FAFC" }}
                  className="form-control"
                  {...register("ngaySinh", {

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
                  Giới Tính
                </label>

                <div className="frame-radio d-flex gap-1 me-1">
                  <input
                    type="radio"
                    id="nam"
                    value="Nam"
                    name="gioiTinh"
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
                    name="gioiTinh"
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
                    name="gioiTinh"
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

              {/* frame-input password vs repassword */}
              <div className="frame-pass-input d-flex justify-content-between gap-2">
                <div className="frame-input mb-2 w-50">
                  <label htmlFor="matKhau" className="fs-6 fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="matKhau"
                    style={{ maxWidth: "500px", background: "#F8FAFC" }}
                    className="form-control"
                    {...register("password", {
                      maxLength: { value: 50, message: "Toi da 50 ki tu" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                        message:
                          "Ít nhất 1 chữ hoa, 1 chữ thường và 1 số. Độ dài ít nhất 8 kí tự",
                      },
                    })}
                  />
                  {errors.matKhau && (
                    <p className="text-danger ps-1 m-0">
                      {errors.matKhau.message}
                    </p>
                  )}
                </div>
                {/* end frame-input */}
                {/* frame-input */}
                <div className="frame-input mb-2 w-50">
                  <label htmlFor="rePassword" className="fs-6 fw-bold">
                    Re-Password
                  </label>
                  <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    style={{ maxWidth: "500px", background: "#F8FAFC" }}
                    className="form-control"
                    {...register("repassword", {
                      maxLength: { value: 50, message: "Toi da 50 ki tu" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                        message:
                          "Ít nhất 1 chữ hoa, 1 chữ thường và 1 số. Độ dài ít nhất 8 kí tự",
                      },
                      // validate: (value) => validateRepassword(password, value),
                    })}
                  />
                  {errors.repassword && (
                    <p className="text-danger ps-1 m-0">
                      {errors.repassword.message}
                    </p>
                  )}
                </div>
                {/* end frame-input */}
              </div>

              <div className="frame-input my-2 mt-4">
                <button
                  type="submit" disabled={!clickSubmit}
                  style={{ maxWidth: "500px", width: "fit-content" }}
                  className="btn btn-success form-control px-3 py-2 rounded-0"
                >
                  <i class="fa-solid fa-pen fa-sm me-2"></i>Update
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
