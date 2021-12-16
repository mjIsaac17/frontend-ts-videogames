import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CompanyAddType,
  CompanyType,
} from "../../state/action-types/company.types";
import { Button, Form, Modal } from "react-bootstrap";

const AddCompanySchema = object().shape({
  name: string().required(),
  shortDescription: string(),
  description: string(),
});

const AddCompanyForm = ({
  onSubmit,
  handleShowModal,
  company,
  buttonStyle,
  buttonText,
}: {
  onSubmit: SubmitHandler<CompanyAddType>;
  handleShowModal: Function;
  company: CompanyType;
  buttonStyle: string;
  buttonText: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyAddType>({
    defaultValues: {
      name: company.name,
      shortDescription: company.shortDescription,
      description: company.description,
    },
    resolver: yupResolver(AddCompanySchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name")} placeholder="Name" />
          <span className="error-text">{errors?.name?.message}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Short description</Form.Label>
          <Form.Control
            as="textarea"
            {...register("shortDescription")}
            placeholder="Short description"
            rows={1}
          />
          <span className="error-text">{errors?.description?.message}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            {...register("description")}
            placeholder="Description"
            rows={3}
          />
          <span className="error-text">{errors?.description?.message}</span>
        </Form.Group>
        {company.imageType !== "" && (
          <Form.Group>
            <Form.Label>Current image</Form.Label>
            <div className="d-flex justify-content-center">
              <img
                className="modal__img"
                src={`data:${company.imageType};base64,${company.image}`}
                alt={company.name}
              />
            </div>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>New image</Form.Label>
          <Form.Control type="file" {...register("image")} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleShowModal(false)}>
          Close
        </Button>
        <Button variant={buttonStyle} type="submit">
          {buttonText}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default AddCompanyForm;
