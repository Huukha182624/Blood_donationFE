// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MainContent from './components/MainContent'; // Trang chủ
import About from './pages/About'; // Giới thiệu
import Login from './components/Login';
import Register from './pages/Register';
import ProfileForm from './pages/ProfileForm';
import BloodDonation from './pages/BloodDonation';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import NewsDetail from './pages/NewsDetail';
import NewsList from './pages/Newslist';
import RegisterForm from './pages/RegisterForm';
import ConfirmRegister from './pages/ConfirmRegister';
import { UserProvider } from './store/userStore.jsx'; // Đúng đường dẫn

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<MainContent />} />
                        <Route path="gioi-thieu" element={<About />} />
                        <Route path="dang-nhap" element={<Login />} />
                        <Route path="/dang-ky" element={<Register />} />
                        <Route path="/ho-so" element={<ProfileForm />} />
                        <Route path="hien-mau" element={<BloodDonation />} />
                        <Route path="/hoi-dap" element={<Faq />} />
                        <Route path="/lien-he" element={<Contact />} />
                        <Route path="tin-tuc" element={<NewsList />} />
                        <Route path="tin-tuc/:id" element={<NewsDetail />} />
                        <Route path="/dang-ky-hien-mau" element={<RegisterForm />} />
                        <Route path="/xac-thuc/:token" element={<ConfirmRegister />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
