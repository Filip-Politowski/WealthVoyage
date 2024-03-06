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
        <p>Track your transactions</p>
        <img src="/transaction.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <p>control the number of loans</p>
        <img src="/loan-menu.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <p>Create your goals</p>
        <img src="/savingGoals.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <p>Have a quick view of your finances</p>
        <img src="/dashboard.svg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <p>And finally track how your money growth</p>
        <img src="/chartLine.svg" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default CardSlider;
