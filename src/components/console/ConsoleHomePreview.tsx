import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { consoleStartGettingAll } from "../../state/action-creators/console.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import ConsoleCard from "./ConsoleCard";

const ConsoleHomePreview = () => {
  console.log("render <ConsoleHomePreview>");
  const dispatch = useDispatch();
  const { consoles, loading } = useSelector(
    (state: RootStore) => state.console
  );

  useEffect(() => {
    dispatch(consoleStartGettingAll(3));
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-list">
          {consoles &&
            consoles.map((console) => (
              <ConsoleCard key={console.name} console={console} />
            ))}
          <h2>Consoles</h2>
        </div>
      )}
    </div>
  );
};

export default ConsoleHomePreview;
