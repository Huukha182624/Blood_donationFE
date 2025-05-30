// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MainContent from './components/MainContent'; // Trang chủ
import About from './pages/About'; // Giới thiệu

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainContent />} />
                    <Route path="gioi-thieu" element={<About />} />
                    {/* Bạn có thể thêm các route khác ở đây, ví dụ:
          <Route path="chuyen-mon" element={<ChuyenMon />} />
          */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
