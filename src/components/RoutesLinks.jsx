import { Routes, Route, Navigate } from "react-router-dom";
import Results from "./Results";
const RoutesLinks = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/search" element={<Results />} />
        <Route path="/image" element={<Results />} />
        <Route path="/news" element={<Results />} />
        <Route path="/video" element={<Results />} />
      </Routes>
    </div>
  );
};

export default RoutesLinks;
