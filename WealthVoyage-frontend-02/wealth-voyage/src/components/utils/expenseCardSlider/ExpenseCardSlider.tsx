import React from "react";
import "./expenseCardSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ExpenseCardSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar]}
      navigation
      slidesPerView={2}
      spaceBetween={40}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <div>Test</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Test</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Test</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Test</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ExpenseCardSlider;
