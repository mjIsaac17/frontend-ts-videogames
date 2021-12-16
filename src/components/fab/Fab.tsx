import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./fab.css";

const Fab = ({
  bgColor,
  icon,
  iconColor,
  hoverText,
  onClickFunction,
  position = "bottom-left",
}: {
  bgColor: string;
  icon: any;
  iconColor: string;
  hoverText: string;
  position?: string;
  onClickFunction: Function;
}) => {
  const handleButtonClick = () => {
    onClickFunction();
  };
  return (
    <OverlayTrigger overlay={<Tooltip>{hoverText}</Tooltip>}>
      <button
        type="button"
        style={{ background: bgColor }}
        className={`fab fab--${position}`}
        onClick={handleButtonClick}
      >
        <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
      </button>
    </OverlayTrigger>
  );
};

export default Fab;
