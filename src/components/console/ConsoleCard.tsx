import { Card } from "react-bootstrap";
import { ConsoleType } from "../../state/action-types/console.types";
import "./console.css";

const ConsoleCard = ({
  console,
  onClickFunction,
}: {
  console: ConsoleType;
  onClickFunction?: Function;
}) => {
  const handleCardClick = () => {
    if (onClickFunction) onClickFunction(console);
  };
  return (
    <Card className="text-white card card--sm" onClick={handleCardClick}>
      <Card.Img
        src={`data:${console.imageType};base64,${console.image}`}
        alt="Card image"
      />
      <Card.ImgOverlay className="card-overlay">
        <Card.Title>{console.name}</Card.Title>
        <Card.Text>{console.description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default ConsoleCard;
