import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyStartGettingAll } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import CompanyCard from "../company/CompanyCard";
const CompanyHomePreview = () => {
  console.log("render <CompanyHomePreview>");

  const dispatch = useDispatch();
  const { companies, loading } = useSelector(
    (state: RootStore) => state.company
  );

  useEffect(() => {
    dispatch(companyStartGettingAll(3));
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-list">
          <h2>Videogames companies</h2>
          {companies &&
            companies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
        </div>
      )}
    </div>
  );
};

export default CompanyHomePreview;