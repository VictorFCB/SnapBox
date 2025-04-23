import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Email from '../pages/Email';


function AppRoutes() {
    return (
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/Email" element={<Email />} />
                </Routes>
    );
}

export default AppRoutes;
