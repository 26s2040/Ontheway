import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";

import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //Retrieve the current value of the state and assign it to a variable.
  //Create the state variables
  const { user,msg}  = useSelector((state) => state.users);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");

  const [confirmPassword, setconfirmPassword] = useState("");

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const dispatch = useDispatch(); //every time we want to call an action, make an action happen
  const navigate = useNavigate(); //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook

  // Handle form submission
  const onSubmit = () => {
     const userData = {
       name: name,
       email: email,
       address:address,
       phone:phone,
       password: password,
       role: "user", 
      
     };
    dispatch(registerUser(userData))
    navigate("/login")
  };

   return (
    <Container fluid className="reg-container">
      <Row>
      <Col md={8}></Col>
        <Col md={4}>
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="appTitle"><h4>Sign Up</h4></div>
            <section>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                /> <p className="error">{errors.email?.message}</p>
              </div>
                <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  placeholder="Enter your phone number..."
                  {...register("phone", {
                    onChange: (e) => setphone(e.target.value),
                  })}
                />
                <p className="error">{errors.phone?.message}</p>
              </div>
               <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="add"
                  placeholder="Write your Address..."
                  {...register("address", {
                    onChange: (e) => setaddress(e.target.value),
                  })}
                />
                <p className="error">{errors.address?.message}</p>
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  {...register("confirmPassword", {
                    onChange: (e) => setconfirmPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
             
              <Button  className="button">
                Register
              </Button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
    
    </Container>
  );
};

export default Register;
