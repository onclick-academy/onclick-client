// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import sv1 from '../../SVGS/sv1.svg'
import sv2 from '../../SVGS/sv2.svg'
import sv3 from '../../SVGS/sv3.svg'
import sv4 from '../../SVGS/sv4.svg'
import sv5 from '../../SVGS/sv5.svg'
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function MySwiper({ width, height }) {
  const svgs = [sv1, sv2, sv3, sv4, sv5]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <div
        style={{
          marginTop: '5.5%',
          width: '10%',
          position: 'absolute',
          left: '14%',
          color: '#2e1f85'
          // fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: '24px' }}>Trusted by:</h1>
      </div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={6}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        speed={2500}
        loop={true}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        onSwiper={swiper => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        style={{ width: '50%', marginTop: '6%' }}
      >
        <SwiperSlide className='  '>
          <div className='flex  '>
            <Image src={sv1} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex'>
            <Image src={sv2} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex'>
            <Image src={sv3} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>{' '}
        <SwiperSlide>
          <div className='flex'>
            <Image src={sv4} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>{' '}
        <SwiperSlide>
          <div className='flex'>
            <Image src={sv5} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex'>
            <Image src={sv1} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex'>
            <Image src={sv2} alt='' style={{ width: '60px', height: '60px' }} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
