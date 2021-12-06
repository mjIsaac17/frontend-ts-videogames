import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./loader.css";

const LoaderSpinner = ({
  color = "black",
  height = 100,
  width = 100,
  loadingText = "",
}: {
  color?: string;
  height?: number;
  width?: number;
  timeout?: number;
  loadingText?: string;
}) => {
  return (
    <div className="loader center">
      {loadingText !== "" && (
        <p className="h1-title" style={{ color: color }}>
          {loadingText}
        </p>
      )}
      <Loader type="ThreeDots" color={color} height={height} width={width} />
    </div>
  );
};

export default LoaderSpinner;
