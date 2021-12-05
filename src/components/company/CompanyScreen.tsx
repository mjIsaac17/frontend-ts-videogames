import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyStartGettingAll } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import CompanyCard from "./CompanyCard";

const CompanyScreen = () => {
  console.log("render <CompanyScreen />");

  const dispatch = useDispatch();
  const companiesPerPage = 20;
  const companyState = useSelector((state: RootStore) => state.company);
  useEffect(() => {
    dispatch(companyStartGettingAll(companiesPerPage));
  }, []);

  const handlePaginationClick = (currentPage: number) => {
    console.log(currentPage);
  };

  console.log(companyState);
  return (
    <div className="container-w95">
      <h3 className="h1-title">Company Home</h3>
      {companyState.loading ? (
        <LoaderSpinner loadingText={true} />
      ) : (
        <>
          <div className="card-list">
            {companyState.companies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
          <CustomPagination
            totalItems={10}
            itemsPerPage={1}
            maxPagesToShow={10}
            handlePaginationClick={handlePaginationClick}
          />
        </>
      )}
    </div>
  );
};

export default CompanyScreen;
