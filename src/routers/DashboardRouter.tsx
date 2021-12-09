import { Routes, Route } from "react-router-dom";
import CompanyDetails from "../components/company/CompanyDetails";
import CompanyScreen from "../components/company/CompanyScreen";
import ConsoleScreen from "../components/console/ConsoleScreen";
import HomeScreen from "../components/home/HomeScreen";
import NavBar from "../components/navbar/NavBar";
import VideogameDetails from "../components/videogame/VideogameDetails";
import VideogameScreen from "../components/videogame/VideogameScreen";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/company" element={<CompanyScreen />} />
        <Route path="/company/:name" element={<CompanyDetails />} />
        <Route path="/console" element={<ConsoleScreen />} />
        <Route path="/videogame" element={<VideogameScreen />} />
        <Route path="/videogame/:name" element={<VideogameDetails />} />
        <Route path="/" element={<HomeScreen />} />
      </Route>
    </Routes>
  );
};

export default DashboardRouter;
