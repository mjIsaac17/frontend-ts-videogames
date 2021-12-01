import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { startRegister } from "../../state/action-creators/auth.actions";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const registerSchema = object().shape({
  name: string().required(),
  email: string().required().email(),
  password: string().required().min(6),
  passwordConfirmation: string().oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = ({ name, email, password }: RegisterForm) => {
    dispatch(startRegister(name, email, password));
  };

  return (
    <Form className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <Card className="register-card">
        <Card.Header className="text-center">
          <h4>Create a new account</h4>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register("name")}
              placeholder="Enter your name"
              autoComplete="none"
            />
            <span className="error-text">{errors?.name?.message}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder="Enter email"
            />
            <span className="error-text">{errors?.email?.message}</span>
          </Form.Group>

          <Form.Group className="row">
            <Form.Group className="col-sm-6">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              <span className="error-text">{errors?.password?.message}</span>
            </Form.Group>
            <Form.Group className="col-sm-6">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                {...register("passwordConfirmation")}
                type="password"
                placeholder="Password"
              />
              <span className="error-text">
                {errors?.passwordConfirmation?.message}
              </span>
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
            <Button type="submit" variant="outline-primary">
              Register
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default RegisterScreen;
