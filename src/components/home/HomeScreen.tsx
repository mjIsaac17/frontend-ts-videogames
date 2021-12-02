import CompanyHomePreview from "../company/CompanyHomePreview";
import ConsoleHomePreview from "../console/ConsoleHomePreview";
import "./homeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home-container">
      <CompanyHomePreview />
      <ConsoleHomePreview />
    </div>
  );
};

export default HomeScreen;
