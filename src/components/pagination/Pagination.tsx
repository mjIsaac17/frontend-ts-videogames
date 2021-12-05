import { useCallback, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

type PageItemType = {
  key: string;
  pageNumber: number;
};

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  handlePaginationClick,
  maxPagesToShow = 5,
}: {
  totalItems: number;
  itemsPerPage: number;
  handlePaginationClick: Function;
  maxPagesToShow?: number;
}) => {
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems] = useState<PageItemType[]>([]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setClassActive = (selectedPage: number) => {
    document
      .getElementById(`page-${currentPage}`)
      ?.parentElement?.classList.remove("active");
    document
      .getElementById(`page-${selectedPage}`)
      ?.parentElement?.classList.add("active");
  };

  const handlePageClick = (selectedPage: number) => {
    setClassActive(selectedPage);

    //Check the selected page bigger that the max of displayed pages
    // 9 (last page) > 11 (maximum of displayed pages) === false, so there is not need to load more pages
    if (selectedPage > maxPagesToShow) {
      //Check if selected page is in current block of page items
      if (!pageItems.find((page) => page.pageNumber === selectedPage))
        loadPageItems(
          selectedPage === totalPages ? selectedPage - maxPagesToShow : 1
        );
    }
    setCurrentPage(selectedPage);

    //Call parent onClick function to fetch page data
    handlePaginationClick(selectedPage);
  };

  const loadPageItems = useCallback(
    (loadPagesFrom: number): void => {
      const pageItemsProps = [] as Array<PageItemType>;
      const remainingPages = totalPages - loadPagesFrom;

      const nextMaxOfDisplayedPages =
        remainingPages <= maxPagesToShow ? remainingPages : maxPagesToShow;

      for (let i = 0; i < nextMaxOfDisplayedPages; i++) {
        const nextPage = loadPagesFrom + i;
        pageItemsProps.push({ key: `page-${nextPage}`, pageNumber: nextPage });
      }

      setPageItems(pageItemsProps);
    },
    [maxPagesToShow, totalPages]
  );

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) return;

    if (nextPage === totalPages) setClassActive(nextPage);

    if (currentPage % maxPagesToShow === 0 && nextPage < totalPages)
      loadPageItems(nextPage);

    setCurrentPage(nextPage);
    handlePaginationClick(nextPage);
  };

  const handlePreviousPage = () => {
    const previosPage = currentPage - 1;
    if (previosPage < 1) return;

    if (currentPage === totalPages) setClassActive(previosPage);

    if (previosPage % maxPagesToShow === 0)
      loadPageItems(currentPage - maxPagesToShow);

    setCurrentPage(previosPage);
    handlePaginationClick(previosPage);
  };

  useEffect(() => {
    loadPageItems(initialPage);
  }, [loadPageItems]);

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageClick(initialPage)} />
      <Pagination.Prev onClick={handlePreviousPage} />
      {pageItems.length > 0 && pageItems[0]?.pageNumber !== initialPage && (
        <>
          <Pagination.Item
            id={`page-${initialPage}`}
            onClick={() => handlePageClick(initialPage)}
          >
            {initialPage}
          </Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}

      {pageItems.map((item) => (
        <Pagination.Item
          id={item.key}
          active={currentPage === item.pageNumber}
          onClick={() => handlePageClick(item.pageNumber)}
          key={item.key}
        >
          {item.pageNumber}
        </Pagination.Item>
      ))}

      {pageItems.length > 0 && (
        <>
          {pageItems[maxPagesToShow - 1]?.pageNumber < totalPages - 1 && (
            <Pagination.Ellipsis disabled />
          )}
          <Pagination.Item
            id={`page-${totalPages}`}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        </>
      )}
      <Pagination.Next onClick={handleNextPage} />
      <Pagination.Last onClick={() => handlePageClick(totalPages)} />
    </Pagination>
  );
};

export default CustomPagination;
