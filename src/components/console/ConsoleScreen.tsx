import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  consoleStartGettingAll,
  consoleSuccessGet,
} from "../../state/action-creators/console.actions";
import { ConsoleType } from "../../state/action-types/console.types";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import ConsoleCard from "./ConsoleCard";

const ConsoleScreen = () => {
  console.log("render <ConsoleScreen />");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selectors
  const consoleState = useSelector((state: RootStore) => state.console);

  // states
  const [currentPage, setCurrentPage] = useState(1);

  // local variables
  const consolesPerPage = 2;
  const maxPagesToShow = 4;
  const totalPages = consoleState.totalPages || 0;

  // handler functions
  const handlePaginationClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleConsoleClick = (console: ConsoleType) => {
    dispatch(consoleSuccessGet(console));
    navigate(`/console/${console.name}`);
  };

  // effects
  useEffect(() => {
    dispatch(consoleStartGettingAll(consolesPerPage, currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="container-w95">
      <h3 className="h1-title">Console Home</h3>
      <div className="card-list">
        {consoleState.loading && (
          <LoaderSpinner loadingText={"Loading consoles..."} color="white" />
        )}
        {consoleState.consoles.length > 0 &&
          consoleState.consoles.map((console) => (
            <ConsoleCard
              key={console.name}
              console={console}
              onClickFunction={handleConsoleClick}
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

export default ConsoleScreen;
