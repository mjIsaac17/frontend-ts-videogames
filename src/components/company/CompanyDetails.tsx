import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { companyStartGet } from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";

const CompanyDetails = () => {
  console.log("render <CompanyDetails />");
  const dispatch = useDispatch();
  const companyState = useSelector((state: RootStore) => state.company);
  const { name } = useParams();

  console.log(companyState);

  useEffect(() => {
    if (!companyState.currentCompany) {
      if (name) dispatch(companyStartGet(name));
    }
  }, [companyState.currentCompany, name, dispatch]);
  return (
    <div className="container">
      {companyState.loading ? (
        <LoaderSpinner loadingText={`${name}...`} color="black" />
      ) : (
        <p className="h1-title">Company {companyState.currentCompany?.name}</p>
      )}
    </div>
  );
};

export default CompanyDetails;
