import { Routes, Route, useNavigate } from "react-router-dom";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import CompanyDetails from "../components/company/CompanyDetails";
import CompanyScreen from "../components/company/CompanyScreen";
import ConsoleScreen from "../components/console/ConsoleScreen";
import Fab from "../components/fab/Fab";
import HomeScreen from "../components/home/HomeScreen";
import NavBar from "../components/navbar/NavBar";
import VideogameDetails from "../components/videogame/VideogameDetails";
import VideogameScreen from "../components/videogame/VideogameScreen";

const DashboardRouter = () => {
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Fab
        icon={faUndo}
        bgColor="#0699FF"
        iconColor="white"
        onClickFunction={handleFabClick}
      />
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
    </>
  );
};

export default DashboardRouter;
