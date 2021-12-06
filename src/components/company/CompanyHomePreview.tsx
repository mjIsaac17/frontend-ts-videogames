import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { companyStartGettingAll } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import CompanyCard from "../company/CompanyCard";
import LoaderSpinner from "../loader/LoaderSpinner";
const CompanyHomePreview = () => {
  console.log("render <CompanyHomePreview>");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companies, loading } = useSelector(
    (state: RootStore) => state.company
  );

  const handleClick = () => {
    navigate("/company");
  };

  useEffect(() => {
    dispatch(companyStartGettingAll(3));
  }, [dispatch]);
  return (
    <div className="card-list">
      {loading ? (
        <LoaderSpinner loadingText="Loading companies..." color="white" />
      ) : (
        <>
          <h2>Companies</h2>
          {companies &&
            companies.map((company) => (
              <CompanyCard
                key={company.name}
                company={company}
                onClickFunction={handleClick}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default CompanyHomePreview;
