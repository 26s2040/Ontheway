import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Location from "./Location";
const Profile = () => {
  const { user, isLogin } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (!user) {
    return (
      <div className="profile-container">
        <p>Loading user information...</p>
      </div>
    );
  }

  const handleUpdate = () => {
    navigate("/update", { state: { user } });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile Information</h1>
        <div className="profile-details">
        <h5 className="welcome-message">Welcome, {user.name}</h5>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Location: </strong>  <Location />
          </p>
        </div>
       
        <button className="update-button" onClick={handleUpdate}>
          Update Information
        </button>
      </div>
    </div>
  );
};

export default Profile;
