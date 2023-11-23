import CardSlider from '../ViewPage/CardSlider';
import Footer from '../ViewPage/Footer';
import Navbar from '../ViewPage/Navbar';
import Slider from '../ViewPage/Slider';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../css/style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import listSPJSON from '../../json/sanphamJSON.json'
import { getRequest } from '../../axios/httpRequest';


let listSPJSON = [];
const HomePage = () => {
    localStorage.clear();
    let navigate = useNavigate();
    const changeRouter = (path) => {
        navigate(path);
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getRequest("/staff/san_pham/list");
                listSPJSON = result;
                setData([...listSPJSON]);

            } catch (error) {
                const objErr = JSON.parse(JSON.stringify(error))
                changeRouter("/error", objErr)
            }
        };
        fetchApi();
    }, [])


    return (
        <div className="container-fluid main-view p-0 background bg-dark">
            <Navbar />
            <div className="container frame-body-main p-2 bg-white rounded-3">
                {/* Slideshow, main content */}
                <div className="mx-auto frame-slideshow rounded bg-dark d-flex justify-content-between p-1" style={{ minWidth: '720px' }}>
                    <Swiper
                        breakpoints={{
                            480: { slidesPerView: 1, spaceBetween: 0 },
                            768: { slidesPerView: 2, spaceBetween: 0 }
                        }}
                        spaceBetween={0}
                        // slidesPerView={2}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>
                            <div className="text-center p-1">
                                <img className='rounded' src={"img/banner/638290991513394994_F-H1_800x300@2x.png"} alt="banner" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center p-1">
                                <img className='rounded' src={"/img/banner/638291145506953603_F-H1_800x300.png"} alt="banner" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center p-1">
                                <img className='rounded' src={"/img/banner/638291169577272462_F-H1_800x300eco2.png"} alt="banner" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center p-1">
                                <img className='rounded' src={"/img/banner/638291720890715309_F-H1_800x300.png"} alt="banner" />
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
                {/* end slideshow, main content */}
                {/* HOT feature product */}
                <div className="frame-featured-product mt-3 rounded bg-white p-2" style={{ minWidth: '720px' }}>
                    <div className="title-feature">
                        <p className="h3 py-3 fw-bold" style={{ color: 'red' }}>HOT SALE <span className='text-white'>TRONG THÁNG</span> </p>
                    </div>
                    <div className="list-featured">
                        <Slider />
                    </div>
                </div>
                {/* /HOT feature product */}
                {/* banner sale */}
                <div className='rounded mt-3 p-0' style={{ overflow: 'hidden', minWidth: '720px' }}>
                    <img className='w-100' style={{ objectFit: 'cover' }} src={'/img/banner/1200x150-tgdd-1200x150-1.png'}></img>
                </div>
                {/* end banner sale */}
                {/* DT noi bat */}
                <div className='mt-3 rounded list-phone px-0' style={{ background: '#F8F9FA', minWidth: '720px' }}>
                    <div className='list-phone-title ps-2'>
                        <p className="h5 py-3 fw-bold">SẢN PHẨM NỔI BẬT </p>
                    </div>
                    <div className='list-phone-product d-flex' style={{ flexWrap: 'wrap' }}>
                        {
                            data.map((element, idx) => {
                                if (idx < 8) {
                                    return (<div className='frame-card p-2 w-25' key={idx} style={{ maxWidth: '25%' }}>
                                        <CardSlider
                                            sp={element}
                                        />
                                    </div>)
                                }
                            })
                        }


                    </div>
                    <div className='frame-btn-more m-2 p-3 d-flex justify-content-center'>
                        <a href="#" className='btn border btn-light shadow'>Xem thêm</a>
                    </div>
                </div>
                {/* end DT noi bat */}

            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default HomePage;