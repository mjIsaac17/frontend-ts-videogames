import { useEffect, useState } from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  companyStartGettingAll,
  companyStartUpdate,
  companySetCurrent,
  companyStartAdd,
  companyStartDelete,
} from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import { CompanyType } from "../../state/action-types/company.types";
import Fab from "../fab/Fab";
import AddCompanyForm from "./AddCompanyForm";
import ConfirmationModal from "./ConfirmationModal";

const CompanyList = () => {
  const dispatch = useDispatch();

  // Selectors
  const companyState = useSelector((state: RootStore) => state.company);

  // States
  const [modalState, setModalState] = useState({
    active: false,
    action: "",
    buttonStyle: "",
  });

  // Local variables
  const itemsPerPage = 10;
  const totalPages = companyState.totalPages || 0;
  const currentCompany = companyState.currentCompany;

  // Handler functions
  const handlePaginationClick = (newPage: number) => {
    dispatch(companyStartGettingAll(itemsPerPage, newPage));
  };

  const handleShowModal = (active: boolean) => {
    setModalState({ ...modalState, active });
  };

  const showUpdateModal = (company: CompanyType) => {
    dispatch(companySetCurrent(company));
    setModalState({
      active: true,
      action: "Update",
      buttonStyle: "primary",
    });
  };

  const showAddModal = () => {
    dispatch(companySetCurrent());
    setModalState({
      active: true,
      action: "Add",
      buttonStyle: "success",
    });
  };

  const showDeleteModal = (company: CompanyType) => {
    dispatch(companySetCurrent(company));
    setModalState({ ...modalState, active: true, action: "Delete" });
  };

  const handleDelete = () => {
    dispatch(companyStartDelete(currentCompany._id));
    setModalState({ ...modalState, active: false });
  };

  const onSubmit = (company: any) => {
    if (modalState.action === "Update")
      dispatch(
        companyStartUpdate(
          { ...company, image: company.image[0] },
          currentCompany?._id || ""
        )
      );
    else if (modalState.action === "Add") {
      dispatch(companyStartAdd({ ...company, image: company.image[0] }));
    }
    setModalState({ ...modalState, active: false });
  };

  // Effects
  useEffect(() => {
    if (companyState.companies.length === 0)
      dispatch(companyStartGettingAll(itemsPerPage));
  }, [dispatch, companyState.companies.length]);

  return (
    <div className="container">
      <h2>Manage companies</h2>
      <div>
        {companyState.loading && (
          <LoaderSpinner loadingText="Loading companies" />
        )}
        <ListGroup as="ol">
          {companyState.companies.map(
            (company, idx) =>
              company.active && (
                <ListGroup.Item as="li" key={company.name}>
                  <div className="d-flex justify-content-between align-items-center">
                    <b>{`${
                      companyState.currentPage === 1
                        ? idx + 1
                        : idx +
                          1 +
                          itemsPerPage * ((companyState.currentPage || 1) - 1)
                    }. ${company.name}`}</b>
                    <div>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => showUpdateModal(company)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => showDeleteModal(company)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              )
          )}
        </ListGroup>
      </div>
      <Fab
        bgColor="#62C61E"
        icon={faPlus}
        iconColor="white"
        hoverText="Add company"
        position="bottom-right"
        onClickFunction={showAddModal}
      />
      {totalPages > 1 && (
        <CustomPagination
          activePage={companyState.currentPage || 1}
          totalPages={totalPages}
          maxPagesToShow={5}
          handlePaginationClick={handlePaginationClick}
        />
      )}

      <Modal
        backdrop="static"
        centered
        onHide={() => handleShowModal(false)}
        show={modalState.active}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${modalState.action} company`}</Modal.Title>
        </Modal.Header>
        {modalState.action !== "Delete" ? (
          <AddCompanyForm
            onSubmit={onSubmit}
            handleShowModal={handleShowModal}
            company={currentCompany}
            buttonStyle={modalState.buttonStyle}
            buttonText={modalState.action}
          />
        ) : (
          <ConfirmationModal
            handleDelete={handleDelete}
            handleShowModal={handleShowModal}
            confirmationMessage={`Are you sure you want to delete the company ${currentCompany.name}?`}
          />
        )}
      </Modal>
    </div>
  );
};

export default CompanyList;
