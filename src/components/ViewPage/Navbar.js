import { useForm } from "react-hook-form";
import { postRequest } from "../../axios/httpRequest";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const Navbar = () => {
  // di chuyển sang url khác, chuyển trang
  let navigate = useNavigate();
  const changeRouter = (path, data) => {
    navigate(path, { state: data });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, setError, clearErrors,reset
  } = useForm();

  const handleChangeLogin = () => {
    clearErrors("loginError");
  }

  const [login, setLogin] = useState(false);

  const onSubmit = (data) => {
    const fetchApi = async () => {
      try {
        const result = await postRequest("/login", data);
        let userInfor = {};
        if (result) {
          localStorage.setItem("accessToken", result);
          userInfor = jwtDecode(result);
          localStorage.setItem("userInfor", JSON.stringify(userInfor));
          setLogin(true)

        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.status === 400) {
          await setErrorField(error.response.data);
        }else{
          changeRouter("/error",error);
        }
      }
    }

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
  //tắt modal khi login thành công
  useEffect(()=>{
    if(login){
      document.getElementsByClassName('btn-close')[0].click();
    }
  },[login])

  return (
    <div
      className="container-fluid frame-navbar mb-2 p-0"
      style={{ background: "#2B2D31", minWidth: "720px" }}
    >
      <nav className="navbar p-0 navbar-expand-lg navbar-light">
        <a
          className="h5 m-0 mr-2 navbar-brand d-flex align-items-center p-0"
          href="#"
        >
          <img
            src={"/img/logo/logo.png"}
            alt="logo"
            style={{
              width: "100px",
              objectFit: "cover",
            }}
          />
        </a>
        <button
          className="navbar-toggler me-2 btn btn-dark border border-dark-subtle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>

        <div
          className="collapse navbar-collapse px-2"
          id="navbarSupportedContent"
        >
          <form className="w-50 form-search-navbar" role="search">
            <div
              className="frame-search rounded border d-flex mx-2"
              style={{ overflow: "hidden" }}
            >
              <input
                type="text"
                className="form-control border-0"
                style={{ borderRadius: "0" }}
                placeholder="Search ..."
              />
              <button
                className="btn d-flex justify-content-center align-items-center border-left"
                style={{ width: "40px" }}
              >
                <i className="fa-solid fa-magnifying-glass text-white"></i>
              </button>
            </div>
          </form>
          <ul className="navbar-nav ms-auto gap-2 my-2 me-2">
            <li className="nav-item drop-btn">
              <a className="m-0 mx-1 nav-link" href="#">
                Sản Phẩm
              </a>
              <div
                className="dropdown-menu-custom bg-white border p-0 text-dark"
                style={{ zIndex: "2" }}
              >
                <div className="d-flex p-2 gap-3">
                  <div className="frame-hangdt m-2">
                    <h6 className="border-bottom">HÃNG SẢN XUẤT</h6>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Apple
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Samsung
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Realme
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Xiaomi
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Nokia
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      ASUS
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      OPPO
                    </a>
                  </div>
                  <div className="frame-pricedt m-2">
                    <h6 className="border-bottom ">MỨC GIÁ</h6>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Dưới 2 triệu
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Từ 2 đến 4 triệu
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Từ 4 đến 7 triệu
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Từ 7 đến 10 triệu
                    </a>
                    <a
                      className="d-block text-reset text-decoration-none"
                      href="#"
                    >
                      Trên 10 triệu
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className="m-0 mx-1 nav-link" href="#">
                Ưu Đãi
              </a>
            </li>
            <li className="nav-item">
              <a className="m-0 mx-1 nav-link" href="#">
                CSKH
              </a>
            </li>
            <li className="nav-item">
              <a className="m-0 mx-1 nav-link" href="#">
                Help
              </a>
            </li>
          </ul>
          <div
            className="frame-login ml-2 p-0 d-flex align-items-center"
            style={{ width: "fit-content" }}
          >
            {/* button modal */}
            {
              !login ?
                (
                  <button type="reset"
                    className="btn rounded-0 btn-toggle-login m-0 mx-1 nav-link font-weight-bold px-3 py-2"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#modalLogin"
                    onClick={()=>{
                      setValue("username","");
                      setValue("password","");
                      reset();
                    }}
                  >
                    Login
                  </button>
                ) :
                (
                  <button className="btn mx-2 d-flex align-items-center justify-content-center me-auto ms-0 p-0 mx-sm-auto my-sm-2 mx-lg-2 ms-lg-3"
                    onClick={() => changeRouter("/management")}
                  >
                    <div className="avt-user bg-white rounded-pill d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>{JSON.parse(localStorage.userInfor).sub[0]}</div>
                    <p className="d-sm-block d-lg-none m-0 text-white ms-2">{JSON.parse(localStorage.userInfor).sub}</p>
                  </button>
                )
            }
            {/* end button modal */}
            {/* modal */}
            <div
              className="modal fade login-modal"
              id="modalLogin"
              tabIndex="-1"
              aria-labelledby="exampleModalLogin"
              aria-hidden="true"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Đăng Nhập
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="frame-input mb-3">
                        <label htmlFor="input-acc" className="fs-6">
                          Account
                        </label>
                        <input
                          type="text"
                          id="input-acc"
                          style={{ maxWidth: "500px" }}
                          className="form-control"
                          placeholder="Nhập tên tài khoản"
                          {...register("username", {
                            onChange: (e) => { handleChangeLogin() }
                          })}
                        />
                      </div>
                      <div className="frame-input mb-3">
                        <label htmlFor="input-pass" className="fs-6">
                          Password
                        </label>
                        <input
                          type="password"
                          id="input-pass"
                          style={{ maxWidth: "500px" }}
                          className="form-control"
                          placeholder="Nhập mật khẩu"
                          {...register("password", {
                            onChange: (e) => { handleChangeLogin() }
                          })}
                        />
                      </div>
                    </div>
                    {errors && errors.loginError && <p className=" px-3 text-danger">
                      {errors.loginError.message}</p>}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                      // data-bs-dismiss="modal"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* end modal */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
