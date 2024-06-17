
//   export default ImageSlider;
import React from 'react';
import Slider from 'react-slick';
import './index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500, // Tăng giá trị này để làm cho chuyển động chậm hơn
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          className='main-image'
          src='//images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?cs=srgb&dl=pexels-enginakyurt-1458867.jpg&fm=jpg'
          alt='Main'
        />
      </div>
      <div>
        <img
          className='main-image'
          src='https://images.pexels.com/photos/298852/pexels-photo-298852.jpeg?cs=srgb&dl=pexels-solliefoto-298852.jpg&fm=jpg'
          alt='Second'
        />
      </div>
      <div>
        <img
          className='main-image'
          src='https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?cs=srgb&dl=pexels-pixabay-265906.jpg&fm=jpg'
          alt='Third'
        />
      </div>
    </Slider>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

export default ImageSlider;
