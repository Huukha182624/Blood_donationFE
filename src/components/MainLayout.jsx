// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';// ✅ Chỉ import 1 lần
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';
import BannerSlider from './BannerSlider';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <BannerSlider />
            <Container sx={{ my: 4 }}>
                <Outlet /> {/* Chỉ nên đặt 1 Outlet ở đây */}
            </Container>
            <Footer />
        </>
    );
};

export default MainLayout;
