import React, { useState } from "react";
import { Button, Col, Container, Row, Input } from "reactstrap";
import SearchResult from "./SearchResult";

const SearchDeliveryPerson = () => {
  const [city, setCity] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city!");
      return;
    }
    setCity(city.toLowerCase()); // Convert city input to lowercase
    setSearchInitiated(true); // Trigger the search result component
  };

  return (
    <Container className="search-delivery-container">
      <Row>
        <Col>
          <h1 className="search-title">Search for a Delivery Driver</h1>
          <div className="search-box">
            <Input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="search-input"
            />
            <Button onClick={handleSearch} className="search-button">
              Search
            </Button>
          </div>
        </Col>
      </Row>
      {searchInitiated && <SearchResult city={city} />}
    </Container>
  );
};

export default SearchDeliveryPerson;
