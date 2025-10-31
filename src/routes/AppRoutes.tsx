import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Services from '../pages/Services';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}

export default AppRoutes;