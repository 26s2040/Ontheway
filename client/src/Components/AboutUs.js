import React from "react";
import { Container, Row, Col } from "reactstrap";

const AboutUs = () => {
  return (
    <Container fluid className="about-us-container">
      <Row>
        <Col md={12} className="about-us-title">
          <h1>Learn More About Us</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="about-text-frame">
          <div className="about-text">
            <p>
              This app lets you choose your preferred delivery person for
              personalized service. Whether receiving or sending an item, you can
              select a courier based on ratings or distance and track them in
              real-time, offering convenient, on-demand delivery for personal or
              business needs.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
