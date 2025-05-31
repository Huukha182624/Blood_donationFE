import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';
import BannerSlider from '../components/BannerSlider';
const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />
            <Navbar />
            {isHomePage && <BannerSlider />}

            <Container sx={{ my: 4 }}>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default MainLayout;
