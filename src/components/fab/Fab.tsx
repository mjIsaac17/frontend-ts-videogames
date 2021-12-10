import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./fab.css";

const Fab = ({
  icon,
  bgColor,
  iconColor,
  onClickFunction,
}: {
  icon: any;
  bgColor: string;
  iconColor: string;
  onClickFunction: Function;
}) => {
  const handleButtonClick = () => {
    onClickFunction();
  };
  return (
    <OverlayTrigger overlay={<Tooltip>Return</Tooltip>}>
      <button
        type="button"
        style={{ background: bgColor }}
        className="fab"
        onClick={handleButtonClick}
      >
        <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
      </button>
    </OverlayTrigger>
  );
};

export default Fab;
