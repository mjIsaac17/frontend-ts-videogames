import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  videogameStartGettingAll,
  videogameSuccessGet,
} from "../../state/action-creators/videogame.actions";
import { VideogameType } from "../../state/action-types/videogame.types";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import VideogameCard from "./VideogameCard";

const VideogameScreen = () => {
  console.log("render <VideogameScreen />");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selectors
  const videogameState = useSelector((state: RootStore) => state.videogame);

  // states
  const [currentPage, setCurrentPage] = useState(1);

  // local variables
  const videogamesPerPage = 2;
  const maxPagesToShow = 4;
  const totalPages = videogameState.totalPages || 0;

  // handler functions
  const handlePaginationClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleVideogameClick = (videogame: VideogameType) => {
    dispatch(videogameSuccessGet(videogame));
    navigate(`/videogame/${videogame.name}`);
  };

  // effects
  useEffect(() => {
    if (!videogameState.currentPage && videogameState.videogames.length === 0)
      dispatch(videogameStartGettingAll(videogamesPerPage, currentPage));
  }, [
    dispatch,
    currentPage,
    videogameState.currentPage,
    videogameState.videogames,
  ]);

  return (
    <div className="container-w95">
      <h3 className="h1-title">Videogame Home</h3>
      <div className="card-list">
        {videogameState.loading && (
          <LoaderSpinner loadingText={"Loading videogames..."} color="white" />
        )}
        {videogameState.videogames.length > 0 &&
          videogameState.videogames.map((videogame) => (
            <VideogameCard
              key={videogame.name}
              videogame={videogame}
              onClickFunction={handleVideogameClick}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          maxPagesToShow={maxPagesToShow}
          handlePaginationClick={handlePaginationClick}
        />
      )}
    </div>
  );
};

export default VideogameScreen;
