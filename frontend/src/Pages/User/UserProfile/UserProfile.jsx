import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./UserProfile.css"; // Optional for additional styles

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setErrorMessage("No user data found in local storage.");
        return;
      }
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(parsedUser); // initialize form data
    } catch (error) {
      setErrorMessage("Failed to load user data from local storage.");
      console.error(error);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-gradient text-white text-center py-4" style={{ background: "linear-gradient(to right, #007bff, #6610f2)" }}>
          <h2 className="fw-bold">Welcome{user?.name ? `, ${user.name}` : ""}!</h2>
          <button
            className="btn btn-light mt-2"
            onClick={() => setShowModal(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="card-body">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {user ? (
            <div className="row">
              {/* Personal Details */}
              <div className="col-md-6 mb-4">
                <h4 className="text-primary border-bottom pb-2">Personal Details</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
                  <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                  <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
                  <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
                </ul>
              </div>

              {/* Address Details */}
              <div className="col-md-6 mb-4">
                <h4 className="text-primary border-bottom pb-2">Address</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Street:</strong> {user.street}</li>
                  <li className="list-group-item"><strong>City:</strong> {user.city}</li>
                  <li className="list-group-item"><strong>State:</strong> {user.state}</li>
                  <li className="list-group-item"><strong>Country:</strong> {user.country}</li>
                  <li className="list-group-item"><strong>Pin Code:</strong> {user.pinCode}</li>
                </ul>
              </div>
            </div>
          ) : (
            !errorMessage && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                ></div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Modal for Editing Profile */}
      {user && (
        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Left Column - Personal */}
                  <div className="col-md-6">
                    <h6>Personal Details</h6>
                    <div className="mb-2">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" value={formData.name || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={formData.email || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Phone</label>
                      <input type="text" className="form-control" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Role</label>
                      <input type="text" className="form-control" name="role" value={formData.role || ""} onChange={handleInputChange} />
                    </div>
                  </div>

                  {/* Right Column - Address */}
                  <div className="col-md-6">
                    <h6>Address Details</h6>
                    <div className="mb-2">
                      <label className="form-label">Street</label>
                      <input type="text" className="form-control" name="street" value={formData.street || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">City</label>
                      <input type="text" className="form-control" name="city" value={formData.city || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">State</label>
                      <input type="text" className="form-control" name="state" value={formData.state || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Country</label>
                      <input type="text" className="form-control" name="country" value={formData.country || ""} onChange={handleInputChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Pin Code</label>
                      <input type="text" className="form-control" name="pinCode" value={formData.pinCode || ""} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
