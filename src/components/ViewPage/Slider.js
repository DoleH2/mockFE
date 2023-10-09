import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CardSlider from '../ViewPage/CardSlider';
import { useEffect, useState } from 'react';
import sanPhamNoiBatJSON from '../../json/sanphamNBJSON.json'

const Slider = () => {
    const [dataNoiBat, setDataNoiBat] = useState([]);
    useEffect(()=>{
        setDataNoiBat(sanPhamNoiBatJSON);
    },[])
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
        >
            {
                dataNoiBat.map((sp,idx)=>(
                    <SwiperSlide key={idx} className='p-2 rounded'>
                        {/* card item */}
                        <CardSlider
                            sp={sp}
                        />
                        {/* end card item */}
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
    )
}

export default Slider;