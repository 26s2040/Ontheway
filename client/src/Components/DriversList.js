import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { fetchUsers, deleteUser } from '../Features/UserSlice';

const DriversList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  // Fetch users from the API
  useEffect(() => {
    if (!Array.isArray(users) || users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

  // Safely filter drivers
  const drivers = Array.isArray(users) ? users.filter((user) => user.role === 'driver') : [];

  // Delete driver handler
  const handleDelete = (driverId) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      dispatch(deleteUser(driverId));
    }
  };

  return (
    <Container className="drivers-container">
      <h2 className="drivers-title">List of Drivers</h2>
      <Row className="drivers-row">
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <Col sm="12" md="6" lg="4" key={driver._id} className="mb-4">
              <Card className="drivers-card">
                <CardBody>
                  <CardTitle tag="h5" className="drivers-name">{driver.name}</CardTitle>
                  <CardText>Email: {driver.email}</CardText>
                  <CardText>Phone: {driver.phone}</CardText>
                  <CardText>Address: {driver.address}</CardText>
                  <Button color="danger" className="delete-button" onClick={() => handleDelete(driver._id)}>
                    Delete
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <p className="no-drivers">No drivers available.</p>
        )}
      </Row>
    </Container>
  );
};

export default DriversList;
