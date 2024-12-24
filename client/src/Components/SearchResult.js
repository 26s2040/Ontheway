import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useSelector } from "react-redux";

const SearchResult = ({ city }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.users); // Access logged-in user info

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers?address=${city}`);
        setDrivers(response.data.drivers);
        setLoading(false);
      } catch (error) {
        setError(`Sorry, there are no drivers available in ${city}.`);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [city]);

  const handleRequest = async (driverId) => {
    const requestData = {
      userEmail: user.email,
      driverId: driverId,    // Driver's ID
      address: user.address, // User's address
    };

    try {
      await axios.post("http://localhost:3001/api/requests", requestData);
      alert("Request sent successfully! The driver will be notified.");
    } catch (error) {
      alert("Failed to send request. Please try again.");
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container>
      <h2>Delivery Drivers Available in {city}</h2>
      <Row>
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <Col sm="4" key={driver._id} className="mb-4">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{driver.name}</CardTitle>
                  <CardText>Email: {driver.email}</CardText>
                  <CardText>Phone: {driver.phone}</CardText>
                  <CardText>Address: {driver.address}</CardText>
                  <Button
                    color="primary"
                    onClick={() => handleRequest(driver._id)}
                  >
                    Request Driver
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <h4>No delivery drivers found for {city}.</h4>
        )}
      </Row>
    </Container>
  );
};

export default SearchResult;
