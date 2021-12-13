import { useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { companyStartGettingAll } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";

const CompanyList = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const companyState = useSelector((state: RootStore) => state.company);

  const totalPages = companyState.totalPages || 0;

  const handlePaginationClick = (newPage: number) => {
    dispatch(companyStartGettingAll(itemsPerPage, newPage));
  };
  console.log(companyState);
  useEffect(() => {
    if (companyState.companies.length === 0)
      dispatch(companyStartGettingAll(itemsPerPage));
  }, [dispatch, companyState.companies.length]);
  return (
    <div className="container">
      <h2>Manage companies</h2>
      <div>
        {companyState.loading && (
          <LoaderSpinner loadingText="Loading companies" />
        )}
        <ListGroup as="ol">
          {companyState.companies.map(({ name }, idx) => (
            <ListGroup.Item as="li" key={name}>
              <div className="d-flex justify-content-between align-items-center">
                <b>{`${
                  companyState.currentPage === 1
                    ? idx + 1
                    : idx +
                      1 +
                      itemsPerPage * ((companyState.currentPage || 1) - 1)
                }. ${name}`}</b>
                <div>
                  <Button variant="info" className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      {totalPages > 1 && (
        <CustomPagination
          activePage={companyState.currentPage || 1}
          totalPages={totalPages}
          maxPagesToShow={5}
          handlePaginationClick={handlePaginationClick}
        />
      )}
    </div>
  );
};

export default CompanyList;
