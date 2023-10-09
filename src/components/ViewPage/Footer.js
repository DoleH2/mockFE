const Footer = ()=>{
return(
    <div className='container-fluid mt-3 p-3 frame-footer border shadow bg-white'>
    <div className='container d-flex gap-5'>
        <div className='frame-info'>
            <h6 className='mb-3'>THÀNH VIÊN TRONG NHÓM</h6>
            <p className='mb-1'>Nguyen Anh Quang</p>
            <p className='mb-1'>Dinh Nhat Thang</p>
            <p className='mb-1'>Le Van Hung</p>
            <p className='mb-1'>Huynh Minh Quoc Nhat</p>
            <p className='mb-1'>Nguyen Xuan Long</p>
        </div>
        <div className='frame-tulieu'>
            <h6 className='mb-3'>TƯ LIỆU THAM KHẢO</h6>
            <p className='mb-1'>https://www.thegioididong.com/</p>
            <p className='mb-1'>https://fptshop.com.vn/</p>
            <p className='mb-1'>https://cellphones.com.vn/</p>
        </div>
    </div>
</div>
)
}

export default Footer;