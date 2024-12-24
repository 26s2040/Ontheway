import React from "react";
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from "reactstrap";

const DriverDashboard = () => {
  return (
    <div className="driver-dashboard">
      <h1 className="text-center my-4">Driver Dashboard</h1>
      <Row>
        <Col md="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">Today's Orders</CardTitle>
              <CardText>
                View and manage the orders assigned to you for today.
              </CardText>
              <Button color="primary">View Orders</Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">Delivery History</CardTitle>
              <CardText>
                Check the details of your completed deliveries.
              </CardText>
              <Button color="secondary">View History</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DriverDashboard;

