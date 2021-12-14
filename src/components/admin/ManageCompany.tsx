import { useEffect, useState } from "react";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  companyStartGettingAll,
  companyStartUpdate,
  companySuccessGet,
} from "../../state/action-creators/company.actions";
import { RootStore } from "../../state/reducers/rootReducer";
import LoaderSpinner from "../loader/LoaderSpinner";
import CustomPagination from "../pagination/Pagination";
import {
  CompanyAddType,
  CompanyType,
} from "../../state/action-types/company.types";
import { useForm } from "react-hook-form";

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

  const AddCompanySchema = object().shape({
    name: string().required(),
    shortDescription: string(),
    description: string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyAddType>({
    resolver: yupResolver(AddCompanySchema),
  });

  // Handler functions
  const handlePaginationClick = (newPage: number) => {
    dispatch(companyStartGettingAll(itemsPerPage, newPage));
  };

  const handleShowModal = (active: boolean) => {
    setModalState({ ...modalState, active });
  };

  const handleEditClick = (company: CompanyType) => {
    dispatch(companySuccessGet(company));
    setModalState({
      active: true,
      action: "Update",
      buttonStyle: "primary",
    });
  };

  const onSubmit = (company: any) => {
    dispatch(
      companyStartUpdate(
        { ...company, image: company.image[0] },
        currentCompany?._id || ""
      )
    );
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
          {companyState.companies.map((company, idx) => (
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
                    onClick={() => handleEditClick(company)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      {totalPages > 1 && (
        <CustomPagination
          activePage={companyState.currentPage || 1}
          totalPages={totalPages}
          maxPagesToShow={5}
          handlePaginationClick={handlePaginationClick}
        />
      )}
      {currentCompany && (
        <Modal
          backdrop="static"
          centered
          onHide={() => handleShowModal(false)}
          show={modalState.active}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`${modalState.action} company`}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("name")}
                  placeholder="Name"
                  defaultValue={currentCompany.name}
                />
                <span className="error-text">{errors?.name?.message}</span>
              </Form.Group>
              <Form.Group>
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("shortDescription")}
                  placeholder="Short description"
                  rows={1}
                  defaultValue={currentCompany.shortDescription}
                />
                <span className="error-text">
                  {errors?.description?.message}
                </span>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("description")}
                  placeholder="Description"
                  rows={3}
                  defaultValue={currentCompany.description}
                />
                <span className="error-text">
                  {errors?.description?.message}
                </span>
              </Form.Group>
              <Form.Group>
                <Form.Label>Current image</Form.Label>
                <div className="d-flex justify-content-center">
                  <img
                    className="modal__img"
                    src={`data:${currentCompany.imageType};base64,${currentCompany.image}`}
                    alt={currentCompany.name}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>New image</Form.Label>
                <Form.Control type="file" {...register("image")} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => handleShowModal(false)}
              >
                Close
              </Button>
              <Button variant={modalState.buttonStyle} type="submit">
                {modalState.action}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default CompanyList;
