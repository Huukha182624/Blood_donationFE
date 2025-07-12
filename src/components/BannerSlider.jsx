// src/components/BannerSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/material';

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.jpg";

const banners = [banner1, banner2, banner3];

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
    };

    return (
        <Box sx={{ width: '100vw', maxWidth: '100vw', mx: 0, px: 0, my: 0 }}>
            <Slider {...settings}>
                {banners.map((img, index) => (
                    <Box key={index} sx={{ height: { xs: 250, sm: 400, md: 600 }, width: '100vw', m: 0, p: 0 }}>
                        <img
                            src={img}
                            alt={`Banner ${index + 1}`}
                            style={{
                                width: '100vw',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center 110px',
                                borderRadius: 0,
                                display: 'block',
                                margin: 0,
                                padding: 0
                            }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );

};

export default BannerSlider;