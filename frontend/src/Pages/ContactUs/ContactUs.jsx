import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t("contact.alert"));
    navigate('/');
  };

  return (
    <div className="contact-wrapper bg-light text-dark">
      {/* Header */}
      <section className="contact-header text-center py-5 bg-white">
        <div className="container">
          <h1 className="fw-bold">{t("contact.title")}</h1>
          <p className="text-muted">{t("contact.subtitle")}</p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-md-7 mb-4">
              <h4 className="fw-bold mb-3">{t("contact.formTitle")}</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="name" placeholder={t("contact.name")} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder={t("contact.email")} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <select className="form-control" name="subject" required onChange={handleChange}>
                    <option value="">{t("contact.selectSubject")}</option>
                    <option value="General">{t("contact.subjects.general")}</option>
                    <option value="Technical">{t("contact.subjects.technical")}</option>
                    <option value="Appointments">{t("contact.subjects.appointments")}</option>
                    <option value="Partnership">{t("contact.subjects.partnership")}</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" name="message" rows="5" placeholder={t("contact.message")} required onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{t("contact.send")}</button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-md-5">
              <h4 className="fw-bold mb-3">{t("contact.infoTitle")}</h4>
              <p><strong>{t("contact.emailLabel")}</strong> support@careconnect.com</p>
              <p><strong>{t("contact.phoneLabel")}</strong> +91 98765 43210</p>
              <p><strong>{t("contact.addressLabel")}</strong> CareConnect HQ, 2nd Floor, Health Plaza, Mumbai, India</p>

              <h5 className="mt-4">{t("contact.followUs")}</h5>
              <div className="d-flex gap-3">
                <Link to="/" className="text-primary"><i className="fab fa-facebook fa-lg"></i></Link>
                <Link to="/" className="text-info"><i className="fab fa-twitter fa-lg"></i></Link>
                <Link to="/" className="text-dark"><i className="fab fa-linkedin fa-lg"></i></Link>
              </div>

              <div className="mt-4">
                <p>{t("contact.needHelp")}</p>
                <Link to="/" className="btn btn-outline-success">{t("contact.book")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
