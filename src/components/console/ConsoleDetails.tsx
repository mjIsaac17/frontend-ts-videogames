import { useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { consoleStartGet } from "../../state/action-creators/console.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import NotFoundScreen from "../error/NotFoundScreen";
import LoaderSpinner from "../loader/LoaderSpinner";

const ConsoleDetails = () => {
  console.log("render <ConsoleDetails />");
  const dispatch = useDispatch();
  const { loading, currentConsole } = useSelector(
    (state: RootStore) => state.console
  );
  const { name } = useParams();
  useEffect(() => {
    if (!currentConsole) {
      if (name) dispatch(consoleStartGet(name));
    }
  }, [currentConsole, name, dispatch]);
  return (
    <div className="container company-container">
      {loading ? (
        <LoaderSpinner loadingText={`${name}...`} color="black" />
      ) : currentConsole ? (
        <Row>
          <Col>
            <p className="h1-title">{currentConsole?.name}</p>
          </Col>

          <Row>
            <Col sm="6" className="company-image-container">
              <img
                className="company-image"
                src={`data:${currentConsole?.imageType};base64,${currentConsole?.image}`}
                alt={name}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-between">
              <Row className="company-description-container text-justify">
                <p>{currentConsole?.description}</p>
              </Row>
              <Row>
                <p>
                  <b className="me-2">Release date:</b>
                  {new Date(currentConsole.releaseDate).toDateString()}
                </p>
              </Row>
              <Row>
                <p>
                  <b className="me-2">Company:</b>
                  <Link to={`/company/${currentConsole?.companyId.name}`}>
                    <Badge pill bg="dark" className="mx-1">
                      {currentConsole?.companyId.name}
                    </Badge>
                  </Link>
                </p>
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
      ) : (
        <NotFoundScreen message="Videogame not found" />
      )}
    </div>
  );
};

export default ConsoleDetails;
