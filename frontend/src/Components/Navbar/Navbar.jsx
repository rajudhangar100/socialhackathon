import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaHeartbeat } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
          style={{
            color: '#0d6efd',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textDecoration: 'none',
          }}
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
              <button
                className="nav-link btn btn-link"
                onClick={handleHomeClick}
                style={{ color: '#333' }}
              >
                {t('navigation.home')}
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
                  {t('navigation.consultations')}
                </button>
                <ul className="dropdown-menu" aria-labelledby="consultationsDropdown">
                  <li>
                    <Link className="dropdown-item" to="/user-home">
                      {t('navigation.newConsultation')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/patient/consults">
                      {t('navigation.medicalHistory')}
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/aboutus" style={{ color: '#333' }}>
                {t('navigation.aboutUs')}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ color: '#333' }}>
                {t('navigation.contact')}
              </Link>
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
                  {t('navigation.careers')}
                </button>
                <ul className="dropdown-menu" aria-labelledby="careersDropdown">
                  <li>
                    <Link className="dropdown-item" to="/careers/doctor-reg">
                      {t('navigation.forDoctor')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/careers/hospitals-reg">
                      {t('navigation.forHospitals')}
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center ms-auto" style={{ marginRight: '120px' }}>
            <div className="d-flex align-items-center gap-2">
              {!user ? (
                <>
                  <Link to="/register" className="btn btn-outline-primary">
                    {t('navigation.register')}
                  </Link>
                  <Link to="/login" className="btn btn-outline-success">
                    {t('navigation.login')}
                  </Link>
                </>
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
                    {user.username || t('navigation.profile')}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li>
                      <button className="dropdown-item" onClick={handleDashboardClick}>
                        {t('navigation.profile')}
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/" onClick={handleLogout}>
                        {t('navigation.logout')}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="ms-auto mx-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
