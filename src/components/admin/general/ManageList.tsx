import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListGroup } from "react-bootstrap";

/**
 * Every element in the dataList should contain the fields:
 *  active: boolean
 *  name: string
 */
const ManageList = ({
  dataList,
  showUpdateModal,
  showDeleteModal,
}: {
  dataList: Array<any>;
  showUpdateModal: Function;
  showDeleteModal: Function;
}) => {
  return (
    <ListGroup as="ol">
      {dataList.map(
        (element) =>
          element.active && (
            <ListGroup.Item as="li" key={element.name}>
              <div className="d-flex justify-content-between align-items-center">
                <b>{element.name}</b>
                <div>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => showUpdateModal(element)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => showDeleteModal(element)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          )
      )}
    </ListGroup>
  );
};

export default ManageList;
