import { Navbar, Nav, NavItem, Collapse } from "reactstrap";
import logo from "../Images/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.users);
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar className="header" expand="md">
      <NavLink to="/" className="navbar-brand">
        <img src={logo} className="logo" alt="Site Logo" />
      </NavLink>
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          {role === "user" && (
            <>
              <NavItem>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/search" className="nav-link">
                  Search for delivery
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dash" className="nav-link">
                  Dashboard
                </NavLink>
              </NavItem>
              
              
            </>
          )}
          {role === "driver" && (
            <>
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/orders" className="nav-link">
                  Orders
                </NavLink>
              </NavItem>
            </>
          )}
           {role === "admin" && (
            <>
          
              <NavItem>
                <NavLink to="/drivers" className="nav-link">
                  Drivers List
                </NavLink>
              </NavItem>
            </>
          )}
          {user && (
            <NavItem>
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link logout-btn"
                aria-label="Logout"
              >
                Logout
              </button>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;


