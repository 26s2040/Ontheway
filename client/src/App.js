import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Login from "./Components/Login";
import DriverDashboard from "./Components/DriverDashboard";
import DriverOrders from "./Components/DriverOrders";
import { useSelector } from "react-redux";
import SearchDeliveryPerson from "./Components/SearchDeliveryPerson";
import AboutUs from "./Components/AboutUs";
import UpdateForm from "./Components/UpdateForm";
import DriversList from "./Components/DriversList";
import Dash from "./Components/Dash";

const App = () => {
  const { user } = useSelector((state) => state.users);
  const role = user?.role;

  return (
    <Container fluid>
      <Router>
        <Row>{user && <Header />}</Row> {/* Render Header only if logged in */}
        <Row className="main">
          <Routes>
            {/* Public Routes */}
            {!role && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Ensure this is accessible */}
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/about-us" element={<AboutUs />} />

              </>
            )}

            {/* User Routes */}
            {role === "user" && (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<SearchDeliveryPerson />} />
                <Route path="/update" element={<UpdateForm />} />
                <Route path="/dash" element={<Dash />} />
                



              </>
            )}

              {role === "admin" && (
              <>
                <Route path="/drivers" element={<DriversList />} />
                
              </>
            )}

            {/* Driver Routes */}
            {role === "driver" && (
              <>
                <Route path="/" element={<DriverDashboard />} />
                <Route path="/orders" element={<DriverOrders />} />
              </>
            )}

            {/* Fallback for Undefined Role */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Row>
        <Row>{user && <Footer />}</Row> {/* Render Footer only if logged in */}
      </Router>
    </Container>
  );
};

export default App;
