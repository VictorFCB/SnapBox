import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Email from '../pages/Email';
import UrlParametrizer from '../pages/UrlParametrizer';


function AppRoutes() {
    return (
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/Email" element={<Email />} />
                    <Route path="/UrlParametrizer" element={<UrlParametrizer />} />
                </Routes>
    );
}

export default AppRoutes;
