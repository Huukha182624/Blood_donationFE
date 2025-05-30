// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MainContent from './components/MainContent'; // Trang chủ

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MainContent />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
