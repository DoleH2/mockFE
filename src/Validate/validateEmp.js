
export const configMes = {
    "HO_TEN": "Vui long nhập chữ và khoảng trắng",
    "TEN_SAN_PHAM": "Vui lòng nhập chữ, số và khoảng trắng",
    "GIOI_TINH": "Vui long chon gioi tinh",
    "SO_DIEN_THOAI": "Vui long nhap so, so dau tien bat dau la 0",
    "DIA_CHI": "Vui long nhap chu hoac so",
    "MIN_SO_LUONG": "Vui long nhap so lon hon 0",
    "MAX_SO_LUONG": "Vui long nhap so be hon 1.000",
    "MIN_GIA_TRI": "Vui long nhap so lon hon 0",
    "MAX_GIA_TRI": "Vui long nhap so be hon 1.000.000.000",
    "MAT_KHAU": "Mat khau khong dung dinh dang",
    "EMAIL": "Vui long nhap dinh dang email",
    "REQ": "Vui lòng nhập trường này"
}


export const validateAccount = (value) => {
    let regex = /^[A-Z]{1}[a-zA-Z0-9]{0,50}$/;
    let result = regex.test(value);
    return result || 'Phải bắt đầu bằng chữ hoa';
}

export const validateName = (value) => {
    let regex = /^[a-zA-Z0-9 \s]{0,50}$/
    let result = regex.test(value);
    return result || 'Chỉ chứa a-z A-Z 0-9 và khoảng cách, tối đa 50 kí tự'
}

export const validateGioiTinh = (value) => {
    if (value !== 'Nam' && value !== 'Nu' && value !== 'Khac') {
        return 'Giá trị có lỗi, vui lòng load lại trang'
    }
    return true;
}

export const validateRepassword = (valuePass, valueRePass) => {
    return valuePass === valueRePass || "Mật khẩu không khớp";
}

export const validateChucVu = (value) => {
    if (value !== 'NhanVien' && value !== 'QuanLy') {
        return 'Giá trị có lỗi, vui lòng load lại trang'
    }
    return true;
}

export const validateInfoKHInHDBH = (soDienThoai, tenKhachHang, gioiTinh, ngaySinh, setError) => {
    if (soDienThoai === undefined) {
        console.log('vao');
        setError('soDienThoai', { message: 'Vui lòng nhập số điện thoại' });
        return false;
    } else {
        let flag = true;
        if (tenKhachHang === "") {
            flag = false;
            setError('tenKhachHang', { message: 'Vui lòng nhập tên khách hàng' });
        }
        if (gioiTinh === "") {
            flag = false;
            setError('gioiTinh', { message: 'Vui lòng chọn giới tính' });
        }
        if (ngaySinh === "") {
            flag = false;
            setError('ngaySinh', { message: 'Vui lòng nhập ngày sinh' });
        }
        if (!flag) {
            return false;
        }
    }
    return true;
}

