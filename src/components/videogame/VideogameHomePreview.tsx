import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videogameStartGettingAll } from "../../state/action-creators/videogame.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import VideogameCard from "./VideogameCard";

const VideogameHomePreview = () => {
  console.log("render <ConsoleHomePreview>");
  const dispatch = useDispatch();
  const { videogames, loading } = useSelector(
    (state: RootStore) => state.videogame
  );

  useEffect(() => {
    dispatch(videogameStartGettingAll(3));
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-list">
          <h2>Videogames</h2>
          {videogames &&
            videogames.map((videogame) => (
              <VideogameCard key={videogame.name} videogame={videogame} />
            ))}
        </div>
      )}
    </div>
  );
};

export default VideogameHomePreview;
