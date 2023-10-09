import { useEffect, useState } from 'react';
import { getImg } from '../../Firebase/configFirebase'
import { useNavigate } from 'react-router-dom';
const CardSlider = ({ sp }) => {
    // di chuyển sang url khác, chuyển trang
    let navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
    }
    //end chuyen trang
    if (!sp) {
        sp = {
            "maSanPham": "",
            "tenSanPham": "",
            "ram": "",
            "nhanHang": "",
            "mauSac": "",
            "giaVon": "",
            "giaNiemYet": "",
            "camera": "",
            "boNhoTrong": "",
            "cpu": "",
            "imgUrl": "img/product/iphone-11-trang-600x600.jpg"
        }
    }

const [getImage, setGetImage] = useState();
useEffect(() => {
    const handleLoadImg = async () => {
        const loadImg = await getImg(sp.imgUrl);
        setGetImage(loadImg);
    }
    handleLoadImg();
}, [])

return (
    <div className="card bg-white border p-1 rounded d-flex flex-column gap-3" style={{height:'350px'}}>
        <div className='card-img p-3' style={{overflow:'hidden',height:'100%'}}>
            <img src={getImage} className="card-img-top mx-auto" alt="..." />
        </div>
        <div className="card-body" style={{height:'125px',minHeight:'125px'}}>
            <a href="#" className="h5 card-title " style={{ cursor: 'pointer' }}>{sp.tenSanPham + " " + sp.mauSac + " " + sp.boNhoTrong}</a>
            <h5 className='new-price text-danger'>{sp.giaNiemYet} VND</h5>
            <h6 className='old-price'>{sp.giaNiemYet * 1.2} VND</h6>
        </div>
    </div>
)
}

export default CardSlider;