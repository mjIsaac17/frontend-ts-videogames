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
import ConsoleDetails from "../components/console/ConsoleDetails";
import CompanyList from "../components/admin/company/ManageCompany";

const DashboardRouter = () => {
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Fab
        bgColor="#0699FF"
        icon={faUndo}
        iconColor="white"
        hoverText="Return"
        onClickFunction={handleFabClick}
      />
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/company" element={<CompanyScreen />} />
          <Route path="/company/:name" element={<CompanyDetails />} />
          <Route path="/admin/company" element={<CompanyList />} />

          <Route path="/console" element={<ConsoleScreen />} />
          <Route path="/console/:name" element={<ConsoleDetails />} />
          <Route path="/videogame" element={<VideogameScreen />} />
          <Route path="/videogame/:name" element={<VideogameDetails />} />
          <Route path="/" element={<HomeScreen />} />
        </Route>
      </Routes>
    </>
  );
};

export default DashboardRouter;
