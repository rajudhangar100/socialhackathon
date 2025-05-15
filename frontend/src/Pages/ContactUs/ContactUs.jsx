import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this with backend/email API
    alert("Thank you for contacting us! We’ll get back to you soon.");
    navigate('/'); // Or redirect to a thank-you page
  };

  return (
    <div className="contact-wrapper bg-light text-dark">
      {/* Header */}
      <section className="contact-header text-center py-5 bg-white">
        <div className="container">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="text-muted">We’re here to help! Reach out for any queries, support, or collaboration ideas.</p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-md-7 mb-4">
              <h4 className="fw-bold mb-3">Send us a Message</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="name" placeholder="Your Name" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder="Your Email" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <select className="form-control" name="subject" required onChange={handleChange}>
                    <option value="">Select Subject</option>
                    <option value="General">General Inquiry</option>
                    <option value="Technical">Technical Support</option>
                    <option value="Appointments">Appointments</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" name="message" rows="5" placeholder="Your Message" required onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-md-5">
              <h4 className="fw-bold mb-3">Contact Information</h4>
              <p><strong>Email:</strong> support@careconnect.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> CareConnect HQ, 2nd Floor, Health Plaza, Mumbai, India</p>

              <h5 className="mt-4">Follow Us</h5>
              <div className="d-flex gap-3">
                <Link to="/" className="text-primary"><i className="fab fa-facebook fa-lg"></i></Link>
                <Link to="/" className="text-info"><i className="fab fa-twitter fa-lg"></i></Link>
                <Link to="/" className="text-dark"><i className="fab fa-linkedin fa-lg"></i></Link>
              </div>

              <div className="mt-4">
                <p>Looking for a doctor or hospital?</p>
                <Link to="/" className="btn btn-outline-success">Book a Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ContactUs;
