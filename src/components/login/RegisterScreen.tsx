import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();
  return (
    <Form className="login-container">
      <Card className="register-card">
        <Card.Header className="text-center">
          <h4>Create a new account</h4>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter your name" autoComplete="none" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="row">
            <Form.Group className="col-sm-6">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="col-sm-6">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Group>
        </Card.Body>
        <Card.Body>
          <div className="login-button-area">
            <Button
              type="button"
              variant="outline-dark"
              onClick={() => navigate("/login")}
            >
              Sign up
            </Button>
            <Button type="button" variant="outline-primary">
              Register
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default RegisterScreen;
