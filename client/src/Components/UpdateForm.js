import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";

import { userSchemaValidation } from "../Validations/UserValidations"; // Validation schema for update
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Features/UserSlice";

const UpdateForm = ({ userId }) => {
  const { user, msg } = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Pre-fill form fields with existing user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  // For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), // Associate your Yup validation schema using the resolver
  });

  const dispatch = useDispatch();

  // Handle form submission
  const onSubmit = () => {
    const userData = { name, email, address, phone };
    console.log("Submitting user data:", userData); // Debug
    dispatch(updateUser({ userId, userData }));
  };

  return (
    <Container fluid className="update-container">
      <Row>
        <Col md={8}></Col>
        <Col md={4}>
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="appTitle">
              <h4>Update User Information</h4>
            </div>
            <section>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  value={name}
                  {...register("name", {
                    onChange: (e) => setName(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  value={email}
                  {...register("email", {
                    onChange: (e) => setEmail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  placeholder="Enter your phone number..."
                  value={phone}
                  {...register("phone", {
                    onChange: (e) => setPhone(e.target.value),
                  })}
                />
                <p className="error">{errors.phone?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter your address..."
                  value={address}
                  {...register("address", {
                    onChange: (e) => setAddress(e.target.value),
                  })}
                />
                <p className="error">{errors.address?.message}</p>
              </div>
              <Button className="button">Update</Button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
    </Container>
  );
};

export default UpdateForm;
