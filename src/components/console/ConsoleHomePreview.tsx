import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { consoleStartGettingAll } from "../../state/action-creators/console.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import ConsoleCard from "./ConsoleCard";

const ConsoleHomePreview = () => {
  console.log("render <ConsoleHomePreview>");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { consoles, loading } = useSelector(
    (state: RootStore) => state.console
  );

  const handleClick = () => {
    navigate("/console");
  };

  useEffect(() => {
    dispatch(consoleStartGettingAll(3));
  }, [dispatch]);

  return (
    <div className="card-list">
      {loading ? (
        <LoaderSpinner loadingText="Loading consoles..." color="white" />
      ) : (
        <>
          {consoles &&
            consoles.map((console) => (
              <ConsoleCard
                key={console.name}
                console={console}
                onClickFunction={handleClick}
              />
            ))}
          <h2>Consoles</h2>
        </>
      )}
    </div>
  );
};

export default ConsoleHomePreview;
