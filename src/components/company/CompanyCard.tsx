import { Card } from "react-bootstrap";
import { CompanyType } from "../../state/action-types/company.types";
import "./company.css";

const CompanyCard = ({
  company,
  onClickFunction,
}: {
  company: CompanyType;
  onClickFunction?: Function;
}) => {
  const handleCardClick = () => {
    if (onClickFunction) onClickFunction();
  };

  return (
    <Card className="text-white card card--sm" onClick={handleCardClick}>
      <Card.Img
        src={`data:${company.imageType};base64,${company.image}`}
        alt="Card image"
      />
      <Card.ImgOverlay className="card-overlay">
        <Card.Title>{company.name}</Card.Title>
        <Card.Text>{company.description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default CompanyCard;
