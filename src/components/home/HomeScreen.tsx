import CompanyHomePreview from "../company/CompanyHomePreview";
import ConsoleHomePreview from "../console/ConsoleHomePreview";
import VideogameHomePreview from "../videogame/VideogameHomePreview";
import "./homeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home-container">
      <CompanyHomePreview />
      <ConsoleHomePreview />
      <VideogameHomePreview />
    </div>
  );
};

export default HomeScreen;
