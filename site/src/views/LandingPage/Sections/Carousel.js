import React from "react";
import Carousel from "react-slick";

import banner1 from "assets/img/slide-show/bg.png";
import banner2 from "assets/img/slide-show/bg2.jpg";
import banner3 from "assets/img/slide-show/bg3.jpg";

export default function Parallax() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <Carousel {...settings} className={"parallex"}>
      <div>
        <img src={banner1} alt="First slide" className="slick-image" />
      </div>
      <div>
        <img src={banner2} alt="Second slide" className="slick-image" />
      </div>
      <div>
        <img src={banner3} alt="Third slide" className="slick-image" />
      </div>
    </Carousel>
  );
}
