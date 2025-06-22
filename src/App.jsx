// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MainContent from './components/MainContent'; // Trang chủ
import About from './pages/About'; // Giới thiệu
import Login from './components/Login';
import Register from './pages/Register';
import ProfileForm from './pages/ProfileForm';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import NewsDetail from './pages/NewsDetail';
import News from './pages/News';
import ConfirmRegister from './pages/ConfirmRegister';
import { UserProvider } from './store/userStore.jsx';
import ScheduleForm from "./components/Schedule";
import Events from "./pages/Events";
import AdminPage from "./admin/AdminPage";
import MainInforPage from "./admin/components/Dashboard/Dashboard";
import DonorManagementPage from "./admin/components/Donormanage/DonorManagement";
import AppointmentManagement from "./admin/components/Appointment/AppointmentManagement";
import BloodManagePage from "./admin/components/Bloodmanage/BloodManagePage";
import EventPage from "./admin/components/Event/EventPage";
import EmployeeManagement from "./admin/components/EmployeeManagement/EmployeeManagement";
import BloodRequestForm from './pages/blood_request_form';

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
                        <Route path="/don-dang-ki" element={<BloodRequestForm />} />
                        <Route path="/hoi-dap" element={<Faq />} />
                        <Route path="/lien-he" element={<Contact />} />
                        <Route path="tin-tuc" element={<News />} />
                        <Route path="news/:id" element={<NewsDetail />} />
                        <Route path="/xac-thuc/:token" element={<ConfirmRegister />} />
                    </Route>
                    <Route path="/" element={<ScheduleForm />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/admin" element={<AdminPage />}>
                        <Route index element={<MainInforPage />} />
                        <Route path="nguoi-hien-mau" element={<DonorManagementPage />} />
                        <Route path="lich-hen" element={<AppointmentManagement />} />
                        <Route path="kho-mau" element={<BloodManagePage />} />
                        <Route path="su-kien" element={<EventPage />} />
                        <Route path="nhan-su" element={<EmployeeManagement />} />
                        <Route path="thong-ke" element={<div style={{ padding: "20px" }}><h1>📈 Báo cáo & thống kê</h1><p>Nội dung...</p></div>} />
                        <Route path="cai-dat" element={<div style={{ padding: "20px" }}><h1>⚙️ Cài đặt hệ thống</h1><p>Nội dung...</p></div>} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
