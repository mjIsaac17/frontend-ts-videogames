import { Card } from "react-bootstrap";
import { ConsoleType } from "../../state/action-types/console.types";
import "./console.css";

const ConsoleCard = ({ console }: { console: ConsoleType }) => {
  return (
    <Card className="text-white card card--sm">
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
