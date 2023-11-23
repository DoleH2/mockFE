import MenuSide from "./MenuSide";
import { useForm } from "react-hook-form";
import { configMes, validateDate, validateInfoKHInHDBH } from "../../Validate/validateEmp";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../axios/httpRequest";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Toast from "../utils/Toast";


const AddHDBHPage = () => {
  // xử lý chuyển trang sang url khác
  let navigate = useNavigate();
  const changeRouter = (path, data) => {
    navigate(path, { state: data });
  }
  // end xử lý chuyển trang

  //lấy dữ liệu nhà cung cấp
  const [listKH, setListKH] = useState([]);
  const [listSP, setListSP] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const resultKH = await getRequest("/staff/khach_hang");
        const resultSP = await getRequest("/staff/san_pham/list");
        setListKH(resultKH);
        setListSP(resultSP);
      } catch (error) {
        setToastStatus({ status: 'error', message: 'Xảy ra lỗi' });
      }
    }
    getData();

  }, []);
  // end lấy dữ liệu ncc
  //xử lý change sdt
  const [sdtSelect, setSdtSelect] = useState();
  const handleChangeSdtKH = (value) => {
    clearErrors("soDienThoai");
    clearErrors("tenKhachHang");
    clearErrors("gioiTinh");
    clearErrors("ngaySinh");
    setSdtSelect(value);
  };
  //end xử lý sdt
  //xử lý form
  const {
    register, handleSubmit, formState: { errors }, setValue, watch, unregister, setError, clearErrors
  } = useForm();
  ////xử lý khi submit
  const [toastStatus, setToastStatus] = useState({ status: '', message: '' });
  // const accountRef = useRef();


  const [clickSubmit, setClickSubmit] = useState(true);
  const onSubmit = async (data) => {
    data.soDienThoai = sdtSelect;
    const result = validateInfoKHInHDBH(data.soDienThoai, data.tenKhachHang, data.gioiTinh, data.ngaySinh, setError);
    if (!result) {
      return;
    }
    if (listCTHD.length === 0) {
      setError('custom', { message: 'Chua co thong tin ban hang' });
      return;
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
    setClickSubmit(false);
    data.maNhanVien = JSON.parse(localStorage.userInfor).sub;
    const fetchApi = async () => {
      try {
        const result = await postRequest("/staff/invoice", data);
        changeRouter("/list-hdbh", { status: 'success', message: 'Thêm thành công' });
      } catch (error) {
        console.log('aaaa');
        setClickSubmit(true);
        const cloneErr = { ...error.response.data }
        await setErrorField(cloneErr);
        setToastStatus({ status: 'error', message: error.message });
        setClickSubmit(true);
      }
    };
    fetchApi();

  };

  //xử lý button add cthd
  const [listCTHD, setListCTHD] = useState([]);

  //xử lý tổng tiền và thanh toán
  const [tinhTien, setTinhTien] = useState({ tongTien: 0, thanhToan: 0 });

  const handleClickAddCTHD = () => {
    clearErrors("custom");
    const newCTHD = {
      maSanPham: null,
      soLuong: null,
      giaNiemYetHienTai: null,
      giaBanThuc: null,
    };
    // idCTDHRef.current = idCTDHRef.current + 1
    setListCTHD([...listCTHD, newCTHD]);
  };
  const handleChangeInputCTDH = (idx, type, value) => {
    const getListCTDH = [...listCTHD];
    if (type === "maSanPham") {
      const valueGiaNiemYet = watch(
        "chiTietHoaDonBanHang[" + idx + "].giaNiemYetHienTai"
      );
      getListCTDH[idx]["giaNiemYetHienTai"] = valueGiaNiemYet;
    }
    getListCTDH[idx][type] = value;
    let sum = 0;
    let realSum = 0;
    getListCTDH.map((element) => {
      sum =
        sum +
        (Number(element.soLuong) || 0) *
        (Number(element.giaNiemYetHienTai) || 0);
      realSum =
        realSum +
        (Number(element.soLuong) || 0) * (Number(element.giaBanThuc) || 0);
    });
    setListCTHD([...getListCTDH]);
    setTinhTien({ tongTien: sum, thanhToan: realSum });
  };

  const handleChangeCTDH = (idxCTDH, maSP) => {
    const getSP = listSP.filter((sp) => Number(sp.maSanPham) === Number(maSP));
    setValue(
      "chiTietHoaDonBanHang[" + idxCTDH + "].giaNiemYetHienTai",
      getSP[0].giaNiemYet
    );
  };
  //end xử lý button add cthd
  //xử lý xóa chi tiết đơn hàng
  const handleClickRemoveCTDH = (idx) => {
    const newArr = listCTHD.filter((ctdh, index) => index !== idx);
    unregister(`chiTietHoaDonBanHang[${listCTHD.length - 1}].maSanPham`);
    unregister(`chiTietHoaDonBanHang[${listCTHD.length - 1}].soLuong`);
    unregister(
      `chiTietHoaDonBanHang[${listCTHD.length - 1}].giaNiemYetHienTai`
    );
    unregister(`chiTietHoaDonBanHang[${listCTHD.length - 1}].giaBanThuc`);
    unregister(`chiTietHoaDonBanHang[${listCTHD.length - 1}]`);
    setListCTHD([...newArr]);
  };
  //end xử lý xóa ctdh
  useEffect(() => {
    listCTHD.forEach((element, idx) => {
      setValue(
        "chiTietHoaDonBanHang[" + idx + "].maSanPham",
        element.maSanPham !== null ? element.maSanPham : ""
      );
      setValue(
        "chiTietHoaDonBanHang[" + idx + "].soLuong",
        element.soLuong !== null ? element.soLuong : ""
      );
      setValue(
        "chiTietHoaDonBanHang[" + idx + "].giaNiemYetHienTai",
        element.giaNiemYetHienTai !== null ? element.giaNiemYetHienTai : ""
      );
      setValue(
        "chiTietHoaDonBanHang[" + idx + "].giaBanThuc",
        element.giaBanThuc !== null ? element.giaBanThuc : ""
      );
    });
  }, [listCTHD]);
  //xử lý option số điện thoại khách hàng
  const options = [];
  for (const obj of listKH) {
    options.push({ value: obj.soDienThoai, label: obj.soDienThoai });
  }
  const [dataKHSelect, setDataKHSelect] = useState([
    { maKhachHang: "", tenKhachHang: "", ngaySinh: "", gioiTinh: "" },
  ]);
  const [onCheck, setOnCheck] = useState(false);

  const handleClickSearch = (sdt) => {
    clearErrors("soDienThoai");
    clearErrors("tenKhachHang");
    clearErrors("gioiTinh");
    clearErrors("ngaySinh");

    const kq = listKH.filter((kh) => kh.soDienThoai === sdt);
    if (kq.length === 0) {
      const newKH = {
        maKhachHang: "",
        tenKhachHang: "",
        ngaySinh: "",
        gioiTinh: "",
      };
      kq.push(newKH);
    }
    setValue("tenKhachHang", kq[0].tenKhachHang);
    setValue("gioiTinh", kq[0].gioiTinh);
    setValue("ngaySinh", kq[0].ngaySinh);
    setDataKHSelect(kq);
    setOnCheck(true);
  };
  //end sdt kh
  // end xử lý form
  return (
    <div className="container-fluid p-0 d-flex bg-white">
      {/* menu side */}
      <MenuSide select="hdbh"></MenuSide>
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
              changeRouter("/list-hdbh");
            }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>Quay về
          </button>
          {/* end button Quay về */}
          <div className="title-body justify-content-center border-bottom d-flex">
            <p className="fs-4 mb-2">Thêm Hóa Đơn Bán Hàng</p>
          </div>
          <div
            className="container frame-input m-0 rounded px-2 py-1"
            style={{ width: "700px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* frame-input */}
              <div className="title-kh fs-5 border-bottom my-3">
                Thông tin Khách Hàng
              </div>
              <div className="frame-input d-flex gap-2 align-items-center">
                <label htmlFor="soDienThoai" className="fs-6 fw-bold w-25 me-4">
                  Số Điện Thoại<span className="text-danger ms-1">*</span>
                </label>
                <CreatableSelect
                  className="form-control border-0 w-100 p-0"
                  options={options}
                  onChange={(e) => {
                    handleChangeSdtKH(e.value);
                    handleClickSearch(e.value);
                  }}
                />
              </div>
              <div className="mb-3">
                {errors.soDienThoai && (
                  <p className="text-danger ps-1 m-0">
                    {errors.soDienThoai.message}
                  </p>
                )}
              </div>
              {/* end frame-input */}

              {/* frame-input */}
              <div className="frame-input d-flex gap-2 align-items-center">
                <label htmlFor="tenKhachHang" className="fs-6 fw-bold w-25 me-4">
                  Họ và Tên<span className="text-danger ms-1">*</span>
                </label>

                <input
                  type="text"
                  style={{ maxWidth: "700px" }}
                  className="form-control"
                  disabled={
                    dataKHSelect[0].tenKhachHang === "" && onCheck
                      ? false
                      : true
                  }
                  {...register("tenKhachHang", {
                    pattern:{value:/^[a-zA-Z0-9 ]/,message:configMes.HO_TEN},
                    max: { value: 50, message: 'Tối đa 50 kí tự' }
                  })}
                />
              </div>
              <div className="mb-3">
                {errors.tenKhachHang && dataKHSelect[0].tenKhachHang === "" && onCheck && (
                  <p className="text-danger ps-1 m-0">
                    {errors.tenKhachHang.message}
                  </p>
                )
                }
              </div>
              {/* end frame-input */}

              <div className="d-flex justify-content-between gap-2">
                {/* frame-input */}
                <div className="frame-input mb-3 w-50">
                  <label htmlFor="maNhaCungCap" className="fs-6 fw-bold">
                    Giới Tính<span className="text-danger ms-1">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="gioiTinh"
                    disabled={
                      dataKHSelect[0].gioiTinh === "" && onCheck ? false : true
                    }
                    {...register("gioiTinh", {
                    })}
                  >
                    <option value="">---Chọn Giới Tính---</option>
                    <option value="Nam">Nam</option>
                    <option value="Nu">Nữ</option>
                    <option value="Khac">Khác</option>
                  </select>
                  <div className="mb-3">
                    {errors.gioiTinh && dataKHSelect[0].gioiTinh === "" && onCheck && (
                      <p className="text-danger ps-1 m-0">
                        {errors.gioiTinh.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* end frame-input */}

                {/* frame-input */}
                <div className="frame-input mb-3 w-50">
                  <label htmlFor="ngaySinh" className="fs-6 fw-bold">
                    Ngày sinh<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="date"
                    // ref={accountRef}
                    id="ngaySinh"
                    style={{ maxWidth: "700px" }}
                    className="form-control"
                    disabled={
                      dataKHSelect[0].ngaySinh === "" && onCheck ? false : true
                    }
                    {...register("ngaySinh", {
                      validate:(value)=>validateDate(value)
                    })}
                  />
                  <div className="mb-3">
                    {errors.ngaySinh && dataKHSelect[0].ngaySinh === "" && onCheck && (
                      <p className="text-danger ps-1 m-0">
                        {errors.ngaySinh.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* end frame-input */}
              </div>

              <div className="title-kh fs-5 border-bottom my-3">
                Thông tin Bán Hàng
              </div>

              {/* chi tiet bán hàng */}
              <div className="frame-chitiethoadon">
                <div className="list-cthd">
                  {listCTHD.map((element, idx) => (
                    <div
                      className="frame-ctdh border p-2 mb-2"
                      key={idx}
                      index-ctdh={element.idx}
                    >
                      <div className="title-ctdh fs-5 fw-bold d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-danger p-0 px-1 ms-auto"
                          onClick={() => {
                            handleClickRemoveCTDH(idx);
                          }}
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                      </div>

                      <div className="d-flex gap-2">
                        <div
                          className="frame-input mb-2"
                          style={{ width: "25%" }}
                        >
                          <label
                            htmlFor={
                              "chiTietHoaDonBanHang[" + idx + "].maSanPham"
                            }
                            className="fs-6 fw-bold"
                          >
                            Sản Phẩm<span className="text-danger ms-1">*</span>
                          </label>
                          <select
                            className="form-control"
                            {...register(
                              "chiTietHoaDonBanHang[" + idx + "].maSanPham",
                              {
                                required: {
                                  value: true,
                                  message: "Vui lòng chọn sản phẩm",
                                },
                                onChange: (e) => {
                                  handleChangeCTDH(idx, e.target.value);
                                  handleChangeInputCTDH(
                                    idx,
                                    "maSanPham",
                                    e.target.value
                                  );
                                },
                              }
                            )}
                          >
                            <option value="">---Sản Phẩm---</option>
                            {listSP.map((sp, idx) => (
                              <option key={idx} value={sp.maSanPham}>
                                {sp.tenSanPham}
                              </option>
                            ))}
                          </select>

                          {errors.chiTietHoaDonBanHang &&
                            errors.chiTietHoaDonBanHang[idx] &&
                            errors.chiTietHoaDonBanHang[idx].maSanPham && (
                              <p className="text-danger ps-1 m-0">
                                {
                                  errors.chiTietHoaDonBanHang[idx].maSanPham
                                    .message
                                }
                              </p>
                            )}
                        </div>

                        <div
                          className="frame-input mb-2 w-25"
                          style={{ width: "25%" }}
                        >
                          <label
                            htmlFor={`chiTietHoaDonBanHang[${idx}].giaNiemYetHienTai`}
                            className="fs-6 fw-bold"
                          >
                            Giá Niêm Yết
                          </label>
                          <input
                            type="text"
                            id={`chiTietHoaDonBanHang[${idx}].giaNiemYetHienTai`}
                            style={{ maxWidth: "500px" }}
                            className="form-control"
                            disabled={true}
                            {...register(
                              "chiTietHoaDonBanHang[" +
                              idx +
                              "].giaNiemYetHienTai",
                              {
                              }
                            )}
                          />
                          {errors.chiTietHoaDonBanHang &&
                            errors.chiTietHoaDonBanHang[idx] &&
                            errors.chiTietHoaDonBanHang[idx]
                              .giaNiemYetHienTai && (
                              <p className="text-danger ps-1 m-0">
                                {
                                  errors.chiTietHoaDonBanHang[idx]
                                    .giaNiemYetHienTai.message
                                }
                              </p>
                            )}
                        </div>

                        <div
                          className="frame-input mb-2"
                          style={{ width: "25%" }}
                        >
                          <label
                            htmlFor={`chiTietHoaDonBanHang[${idx}].soLuong`}
                            className="fs-6 fw-bold"
                          >
                            Số Lượng<span className="text-danger ms-1">*</span>
                          </label>
                          <input
                            type="number"
                            id={`chiTietHoaDonBanHang[${idx}].soLuong`}
                            placeholder="Nhập số lượng"
                            style={{ maxWidth: "500px" }}
                            className="form-control"
                            {...register(
                              "chiTietHoaDonBanHang[" + idx + "].soLuong",
                              {
                                required: {
                                  value: true,
                                  message: configMes.REQ,
                                },
                                min:{
                                  value:1,
                                  message:'Nhỏ nhất là 1'
                                },
                                max:{
                                  value:1000000,
                                  message:'Tối đa 1,000,000'
                                },
                                onChange: (e) => {
                                  handleChangeInputCTDH(
                                    idx,
                                    "soLuong",
                                    e.target.value
                                  );
                                },
                              }
                            )}
                          />
                          {errors.chiTietHoaDonBanHang &&
                            errors.chiTietHoaDonBanHang[idx] &&
                            errors.chiTietHoaDonBanHang[idx].soLuong && (
                              <p className="text-danger ps-1 m-0">
                                {
                                  errors.chiTietHoaDonBanHang[idx].soLuong
                                    .message
                                }
                              </p>
                            )}
                        </div>

                        <div
                          className="frame-input mb-2"
                          style={{ width: "25%" }}
                        >
                          <label
                            htmlFor={`chiTietHoaDonBanHang[${idx}].giaBanThuc`}
                            className="fs-6 fw-bold"
                          >
                            Giá Thực<span className="text-danger ms-1">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Nhập giá bán"
                            id={`chiTietHoaDonBanHang[${idx}].giaBanThuc`}
                            style={{ maxWidth: "500px" }}
                            className="form-control"
                            {...register(
                              "chiTietHoaDonBanHang[" + idx + "].giaBanThuc",
                              {
                                required: {
                                  value: true,
                                  message: configMes.REQ,
                                },
                                min:{
                                  value:1,
                                  message:'Nhỏ nhất là 1'
                                },
                                max:{
                                  value:1000000000,
                                  message:'Tối đa 1,000,000,000'
                                },
                                onChange: (e) => {
                                  handleChangeInputCTDH(
                                    idx,
                                    "giaBanThuc",
                                    e.target.value
                                  );
                                },
                              }
                            )}
                          />
                          {errors.chiTietHoaDonBanHang &&
                            errors.chiTietHoaDonBanHang[idx] &&
                            errors.chiTietHoaDonBanHang[idx].giaBanThuc && (
                              <p className="text-danger ps-1 m-0">
                                {
                                  errors.chiTietHoaDonBanHang[idx].giaBanThuc
                                    .message
                                }
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="frame-btn border-bottom py-2 pb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClickAddCTHD}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="py-2">
                  <div className="frame-input mb-2 d-flex w-100 align-items-center">
                    <label className="fs-6 fw-bold w-25">Tổng tiền</label>
                    <input
                      type="text"
                      style={{ maxWidth: "500px" }}
                      className="form-control"
                      disabled={true}
                      value={tinhTien.tongTien}
                    />
                  </div>
                  <div className="frame-input mb-2 d-flex w-100 align-items-center">
                    <label className="fs-6 fw-bold w-25">Thanh Toán</label>
                    <input
                      type="text"
                      style={{ maxWidth: "500px" }}
                      className="form-control"
                      disabled={true}
                      value={tinhTien.thanhToan}
                    />
                  </div>
                </div>
              </div>
              {/* end chi tiết sản phẩm */}
              <div className="frame-input my-2 mt-4">
                {errors.custom && <p className="text-danger m-0">{errors.custom.message}</p>}
                <button
                  type="submit"
                  disabled={!clickSubmit}
                  style={{ maxWidth: "500px", width: "fit-content" }}
                  className="btn btn-success form-control px-3 py-2 rounded-0"
                >
                  <i className="fa-solid fa-plus me-2"></i>Thêm
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

export default AddHDBHPage;
