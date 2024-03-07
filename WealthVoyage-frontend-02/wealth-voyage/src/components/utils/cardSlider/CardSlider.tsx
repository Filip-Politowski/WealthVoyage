import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./cardSlider.scss";

const CardSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar]}
      navigation
      slidesPerView={3}
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
        <h2>Track your transactions</h2>
        <img src="/transaction.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <h2>Control the number of loans</h2>
        <img src="/loan-menu.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <h2>Create your goals</h2>
        <img src="/savingGoals.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <h2>Have a quick view of your finances</h2>
        <img src="/dashboard.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <h2>And finally track how your money growth</h2>
        <img src="/chartLine.svg" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default CardSlider;
