import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import "./login.css";
import { startLogin } from "../../state/action-creators/auth.actions";

type LoginForm = {
  email: string;
  password: string;
};

const loginSchema = object().shape({
  email: string().required().email(),
  password: string().required(),
});

const LoginScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = ({ email, password }: LoginForm) => {
    dispatch(startLogin(email, password));
  };

  return (
    <Form className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <Card className="login-card">
        <Card.Header className="text-center">
          <h4>Sign in to start</h4>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <span className="error-text">{errors?.email?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <span className="error-text">{errors?.password?.message}</span>
          </Form.Group>
        </Card.Body>
        <Card.Body>
          <div className="login-button-area">
            <Button
              type="button"
              variant="outline-dark"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>

            <Button type="submit" variant="outline-primary">
              Login
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default LoginScreen;
