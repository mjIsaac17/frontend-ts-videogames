import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderSpinner = ({
  color = "black",
  height = 100,
  width = 100,
  loadingText = false,
}: {
  color?: string;
  height?: number;
  width?: number;
  timeout?: number;
  loadingText?: boolean;
}) => {
  return (
    <div className="center">
      {loadingText && <p className="h1-title">Loading</p>}
      <Loader type="ThreeDots" color={color} height={height} width={width} />
    </div>
  );
};

export default LoaderSpinner;
