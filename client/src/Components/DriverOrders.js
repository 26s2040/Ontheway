import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDriverRequests } from "../Features/RequestSlice"; // Import getDriverRequests

const DriverOrders = ({ driverId }) => {
  const dispatch = useDispatch();
  
  // Get the requests data from Redux store
  const { requests, error, msg } = useSelector((state) => state.requests);
  
  const [localRequests, setLocalRequests] = useState([]); // Local state for requests
  
  // Fetch orders for the specific driver based on driverId
  useEffect(() => {
    if (driverId) {
      dispatch(getDriverRequests(driverId)); // Dispatch action to fetch orders for driver
    }
  }, [dispatch, driverId]);

  // Sync local state with fetched requests
  useEffect(() => {
    if (requests) {
      setLocalRequests(requests); // Update local state when requests are fetched
    }
  }, [requests]);

  // Update order status locally
  const updateOrderStatus = (id, newStatus) => {
    setLocalRequests((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Check if there's an error in fetching data
  if (error) {
    return (
      <Container className="my-5">
        <Alert color="danger">{msg || "An error occurred while fetching orders."}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-4">Driver Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localRequests.length > 0 ? (
            localRequests.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.userEmail}</td>
                <td>{order.address}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "bg-warning"
                        : order.status === "In Progress"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === "pending" && (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => updateOrderStatus(order._id, "In Progress")}
                    >
                      Start
                    </Button>
                  )}
                  {order.status === "In Progress" && (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => updateOrderStatus(order._id, "Completed")}
                    >
                      Complete
                    </Button>
                  )}
                  {order.status === "Completed" && (
                    <span className="text-success">Completed</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No orders available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DriverOrders;
