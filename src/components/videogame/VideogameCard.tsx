import { Card } from "react-bootstrap";
import { VideogameType } from "../../state/action-types/videogame.types";
import "./videogame.css";

const VideogameCard = ({ videogame }: { videogame: VideogameType }) => {
  return (
    <Card className="text-white card card--sm">
      <Card.Img
        src={`data:${videogame.imageType};base64,${videogame.image}`}
        alt="Card image"
      />
      <Card.ImgOverlay className="card-overlay">
        <Card.Title>{videogame.name}</Card.Title>
        <Card.Text>{videogame.description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default VideogameCard;
