import { Routes, Route } from "react-router-dom";
import HomeScreen from "../components/home/HomeScreen";

const DashboardRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
};

export default DashboardRouter;
