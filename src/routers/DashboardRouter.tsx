import { Routes, Route } from "react-router-dom";
import HomeScreen from "../components/home/HomeScreen";
import NavBar from "../components/navbar/NavBar";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Route>
    </Routes>
  );
};

export default DashboardRouter;
