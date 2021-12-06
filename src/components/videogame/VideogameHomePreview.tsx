import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { videogameStartGettingAll } from "../../state/action-creators/videogame.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import VideogameCard from "./VideogameCard";

const VideogameHomePreview = () => {
  console.log("render <ConsoleHomePreview>");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videogames, loading } = useSelector(
    (state: RootStore) => state.videogame
  );

  const handleClick = () => {
    navigate("/videogame");
  };

  useEffect(() => {
    dispatch(videogameStartGettingAll(3));
  }, [dispatch]);
  return (
    <div className="card-list">
      {loading ? (
        <LoaderSpinner loadingText="Loading videogames..." color="white" />
      ) : (
        <>
          <h2>Videogames</h2>
          {videogames &&
            videogames.map((videogame) => (
              <VideogameCard
                key={videogame.name}
                videogame={videogame}
                onClickFunction={handleClick}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default VideogameHomePreview;
