import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null); // Track logged-in user state
  const [role, setRole] = useState(null); // Track role
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role); // assuming the user object has a 'role' key
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null);
    setRole(null);
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/user-profile');
    }
  };

  const handleHomeClick = () => {
    if (user && role) {
      if (role === 'doctor') {
        navigate('/doc-home');
      } else if (role === 'hospital') {
        navigate('/hos-home');
      } else {
        navigate('/user-home');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: '#f9fdfd', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={handleHomeClick}
          style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none' }}
        >
          <FaHeartbeat className="me-2" style={{ color: '#0d6efd' }} />
          CareConnect
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleHomeClick} style={{ color: '#333' }}>
                Home
              </button>
            </li>

            {user && role === 'patient' && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="consultationsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: '#333', textDecoration: 'none' }}
                >
                  Consultations
                </button>
                <ul className="dropdown-menu" aria-labelledby="consultationsDropdown">
                  <li><Link className="dropdown-item" to="/user-home">New Consultation</Link></li>
                  <li><Link className="dropdown-item" to="/patient/consults">Medical History</Link></li>
                </ul>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/aboutus" style={{ color: '#333' }}>About Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ color: '#333' }}>Contact</Link>
            </li>

            {!user && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="careersDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: '#333', textDecoration: 'none' }}
                >
                  Careers
                </button>
                <ul className="dropdown-menu" aria-labelledby="careersDropdown">
                  <li><Link className="dropdown-item" to="/careers/doctor-reg">For Doctor</Link></li>
                  <li><Link className="dropdown-item" to="/careers/hospitals-reg">For Hospitals</Link></li>
                </ul>
              </li>
            )}
          </ul>

          {!user ? (
            <div className="d-flex gap-2 me-3">
              <Link to="/login" className="btn btn-outline-success">Login</Link>
              <Link to="/register" className="btn btn-outline-primary">Register</Link>
            </div>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="me-2" size={20} />
                {user.username || 'Profile'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li><button className="dropdown-item" onClick={handleDashboardClick}>Profile</button></li>
                
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
