import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { RootStore } from "../state/reducers/rootReducer";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const authState = useSelector((state: RootStore) => state.auth);
  if (!!authState.auth) return <Navigate to="/" state={{ from: location }} />;
  return children;
};

export default PublicRoute;
