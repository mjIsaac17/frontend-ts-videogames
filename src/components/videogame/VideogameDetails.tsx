import { useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { videogameStartGet } from "../../state/action-creators/videogame.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import NotFoundScreen from "../error/NotFoundScreen";
import LoaderSpinner from "../loader/LoaderSpinner";

const VideogameDetails = () => {
  console.log("render <VideogameDetails />");
  const dispatch = useDispatch();
  const { loading, currentVideogame } = useSelector(
    (state: RootStore) => state.videogame
  );
  const { name } = useParams();
  useEffect(() => {
    if (!currentVideogame) {
      if (name) dispatch(videogameStartGet(name));
    }
  }, [currentVideogame, name, dispatch]);

  return (
    <div className="container h-100">
      {loading ? (
        <LoaderSpinner loadingText={`${name}...`} color="black" />
      ) : currentVideogame?.name ? (
        <Row className="company-container">
          <Col>
            <p className="h1-title">{currentVideogame?.name}</p>
          </Col>

          <Row>
            <Col sm="6" className="company-image-container">
              <img
                className="company-image"
                src={`data:${currentVideogame?.imageType};base64,${currentVideogame?.image}`}
                alt={name}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-between">
              <Row className="company-description-container text-justify">
                <p>{currentVideogame?.description}</p>
              </Row>
              <Row>
                <p>
                  <b className="me-2">Release date:</b>
                  {new Date(currentVideogame.releaseDate).toDateString()}
                </p>
              </Row>
              <Row>
                {currentVideogame.companies.length > 0 ? (
                  <p>
                    <b className="me-2">Companies:</b>
                    {currentVideogame.companies.map((company) => (
                      <Link to={`/company/${company.name}`} key={company.name}>
                        <Badge pill bg="dark" className="mx-1">
                          {company.name}
                        </Badge>
                      </Link>
                    ))}
                  </p>
                ) : (
                  <p>No companies found</p>
                )}
              </Row>
              <Row>
                {currentVideogame.consoles.length > 0 ? (
                  <p>
                    <b className="me-2">Consoles:</b>
                    {currentVideogame.consoles.map((console) => (
                      <Link to={`/console/${console.name}`} key={console.name}>
                        <Badge pill bg="dark" className="mx-1">
                          {console.name}
                        </Badge>
                      </Link>
                    ))}
                  </p>
                ) : (
                  <p>No consoles found</p>
                )}
              </Row>
              <Row className="bg-dark text-center text-white">
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

export default VideogameDetails;
