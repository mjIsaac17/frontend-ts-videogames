import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyStartGettingAll } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import CompanyCard from "../company/CompanyCard";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector(
    (state: RootStore) => state.company
  );

  useEffect(() => {
    dispatch(companyStartGettingAll());
  }, []);

  return (
    <div>
      <h1>Videogames companies</h1>
      {loading ? <p>Loading...</p> : <CompanyCard company={companies[0]} />}
    </div>
  );
};

export default HomeScreen;
