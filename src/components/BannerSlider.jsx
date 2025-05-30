// src/components/BannerSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/material';

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const banners = [banner1, banner2, banner3];

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Slider {...settings}>
                {banners.map((img, index) => (
                    <Box key={index}>
                        <img
                            src={img}
                            alt={`Banner ${index + 1}`}
                            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default BannerSlider;
