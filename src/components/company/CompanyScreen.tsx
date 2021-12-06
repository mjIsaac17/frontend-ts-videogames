import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyStartGettingAll } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import CompanyCard from "./CompanyCard";

const CompanyScreen = () => {
  console.log("render <CompanyScreen />");

  const dispatch = useDispatch();

  // selectors
  const companyState = useSelector((state: RootStore) => state.company);

  // states
  const [currentPage, setCurrentPage] = useState(1);

  // local variables
  const companiesPerPage = 2;
  const maxPagesToShow = 4;
  const totalPages = companyState.totalPages || 0;

  // handler functions
  const handlePaginationClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // effects
  useEffect(() => {
    dispatch(companyStartGettingAll(companiesPerPage, currentPage));
  }, [dispatch, currentPage]);

  console.log(companyState);
  return (
    <div className="container-w95">
      <h3 className="h1-title">Company Home</h3>
      <div className="card-list">
        {companyState.loading && (
          <LoaderSpinner loadingText={"Loading companies..."} color="white" />
        )}
        {companyState.companies.length > 0 &&
          companyState.companies.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          maxPagesToShow={maxPagesToShow}
          handlePaginationClick={handlePaginationClick}
        />
      )}
    </div>
  );
};

export default CompanyScreen;
