import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { companyStartGet } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";

const CompanyDetails = () => {
  console.log("render <CompanyDetails />");
  const dispatch = useDispatch();
  const { loading, currentCompany } = useSelector(
    (state: RootStore) => state.company
  );
  const { name } = useParams();
  useEffect(() => {
    if (!currentCompany) {
      if (name) dispatch(companyStartGet(name));
    }
  }, [currentCompany, name, dispatch]);
  return (
    <div className="container details-container">
      {loading ? (
        <LoaderSpinner loadingText={`${name}...`} color="black" />
      ) : (
        <Row>
          <Col>
            <p className="h1-title">{currentCompany?.name}</p>
          </Col>

          <Row>
            <Col sm="6" className="details-image-container">
              <img
                className="details-image"
                src={`data:${currentCompany?.imageType};base64,${currentCompany?.image}`}
                alt={name}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-between">
              <Row className="details-description-container text-justify">
                <p>{currentCompany?.description}</p>
              </Row>
              <Row className="bg-dark text-center mb-5 text-white">
                <Col>
                  <Link className="a-no-style" to="/consoles">
                    Consoles
                  </Link>
                </Col>
                <Col>
                  <Link className="a-no-style" to="/videogames">
                    Videogames
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      )}
    </div>
  );
};

export default CompanyDetails;
