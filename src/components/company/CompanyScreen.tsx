import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  companyStartGettingAll,
  companySetCurrent,
} from "../../state/action-creators/company.actions";
import { CompanyType } from "../../state/action-types/company.types";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import CompanyCard from "./CompanyCard";

const CompanyScreen = () => {
  console.log("render <CompanyScreen />");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selectors
  const companyState = useSelector((state: RootStore) => state.company);

  // local variables
  const companiesPerPage = 2;
  const maxPagesToShow = 4;
  const totalPages = companyState.totalPages || 0;

  // handler functions
  const handlePaginationClick = useCallback(
    (newPage: number) => {
      dispatch(companyStartGettingAll(companiesPerPage, newPage));
    },
    [dispatch]
  );

  const handleCompanyClick = (company: CompanyType) => {
    dispatch(companySetCurrent(company));
    navigate(`/company/${company.name}`);
  };

  // effects
  useEffect(() => {
    if (!companyState.currentPage && companyState.companies.length === 0) {
      console.log("Effect load companies");
      dispatch(companyStartGettingAll(companiesPerPage, 1));
    }
  }, [dispatch, companyState.currentPage, companyState.companies.length]);

  return (
    <div className="container-w95">
      <h3 className="h1-title">Company Home</h3>
      <div className="card-list">
        {companyState.loading && (
          <LoaderSpinner loadingText={"Loading companies..."} color="white" />
        )}
        {companyState.companies.length > 0 &&
          companyState.companies.map((company) => (
            <CompanyCard
              key={company.name}
              company={company}
              onClickFunction={handleCompanyClick}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination
          activePage={companyState.currentPage || 1}
          totalPages={totalPages}
          maxPagesToShow={maxPagesToShow}
          handlePaginationClick={handlePaginationClick}
        />
      )}
    </div>
  );
};

export default CompanyScreen;
