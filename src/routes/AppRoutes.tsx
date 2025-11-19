import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Services from '../pages/Services';
import Destination from '../pages/Destination';
import Admin from '../pages/Admin';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/destinations" element={<Destination />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AppRoutes;