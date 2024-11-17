'use client'
import style from '@/styles/gallery.module.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// static images
import double from '@/public/double01.jpg';
import single from '@/public/single01.jpg';
import gall01 from '@/public/gall01.jpg';
import gall02 from '@/public/gall02.jpg';
import gall03 from '@/public/gall03.jpg';
import gall04 from '@/public/gall04.jpg';
import gall05 from '@/public/gall05.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '@/styles/swiper.css';
// import required modules
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';

export default function Gallery() {
  const [perPage, setPerPage] = useState(3);
  const pics =[gall01, gall02, single, gall03, gall04, double,gall05];
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  useEffect(() => {
    const hadleResize = () => {
      let slideNum;
      if(window.innerWidth > 980) {
        slideNum = 3;
      } else if(window.innerWidth > 780) {
        slideNum = 2;
      } else {
        slideNum = 1;
      }
      setPerPage(slideNum);
    }
    window.addEventListener('resize', hadleResize);
    return ()=> window.removeEventListener('resize', hadleResize);
  },[]);
  return (
    <section className={style.container} id='gallery'>
      <h3 className='section-title'>Gallery</h3>
      <Swiper
        loop={true}
        cssMode={true}
        navigation={true}
        keyboard={true}
        mousewheel={true}
        slidesPerView={perPage}
        spaceBetween={10}
        pagination={pagination}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {
        pics.map((pic, index) => (
          <SwiperSlide key={index}>
          <Image src={pic} alt='galler picture' width={400} height={300} placeholder='blur'/>
          </SwiperSlide>
        ))
        }
      </Swiper>
    </section>
  );
}
