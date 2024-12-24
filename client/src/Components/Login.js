import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { useEffect, useState } from "react";
import { loginSchemaValidation } from "../Validations/LoginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  // State variables
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { msg, isLogin } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
    navigate("/");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <Container fluid className="login-container">
      {/* Title and "Learn More About Us" Link */}
      <Row className="top-row">
        <Col>
          <div className="app-title">
            <h1>OnTheWay</h1>
            <Link to="/about-us" className="special-link">
              About Us
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <h6 className="logout-message">{msg}</h6>

        <Col md={6}></Col>
        <Col md={4}>
          {/* Form */}
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <section>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </div>

              <button type="submit" color="primary" className="button">
                Sign In
              </button>

              {/* Add Link Below the Button */}
              <p>
                No Account?{" "}
                <Link className="link" to="/register">
                  Create Account
                </Link>
              </p>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
    </Container>
  );
};

export default Login;
