import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './AboutUs.css';

const AboutUs = () => {
  const features = [
    {
      title: 'Nearby Hospital Consultations',
      desc: 'Quickly find and consult with trusted hospitals near you with real-time availability.'
    },
    {
      title: 'Personal Doctor Appointments',
      desc: 'Consult directly with your preferred doctor online and get continuous personalized care.'
    },
    {
      title: 'Secure User Authentication',
      desc: 'Safe and reliable login system with role-based access for patients, doctors, and hospitals.'
    },
    {
      title: 'Smart Booking System',
      desc: 'Easily book, reschedule, or cancel appointments with just a few clicks.'
    },
    {
      title: 'Review & Rating System',
      desc: 'See real patient reviews and ratings to make informed healthcare decisions.'
    },
    {
      title: 'Responsive & Modern UI',
      desc: 'Built with the latest technologies to deliver a smooth experience on any device.'
    },
    {
      title: 'Hospital Admin Dashboard',
      desc: 'Hospitals can efficiently manage their doctors, schedules, appointments, and patient interactions from one place.'
    },
    {
      title: 'Doctor-Friendly Interface',
      desc: 'Doctors can securely access patient records, histories, and health reports to provide accurate consultations.'
    },
    {
      title: 'AI-Powered Eye Diagnosis',
      desc: 'Upload an image of your eye, and our machine learning model predicts conditions like cataract, glaucoma, diabetic retinopathy, and more.'
    }
  ];

  return (
    <div className="about-wrapper bg-light text-dark">
      {/* Hero Section */}
      <section className="about-hero text-center py-5 bg-white">
        <div className="container animate__animated animate__fadeInDown">
          <h1 className="display-4 fw-bold">About CareConnect</h1>
          <p className="lead text-muted mt-3">
            Empowering patients with seamless access to trusted healthcare professionals and hospitals.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0 animate__animated animate__fadeInLeft">
              <img
                src="/aboutus1.jpg"
                alt="Mission"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6 animate__animated animate__fadeInRight">
              <h2 className="fw-bold">Our Mission</h2>
              <p className="text-muted">
                At CareConnect, our mission is to bridge the gap between patients and healthcare providers by
                delivering a powerful platform for real-time consultations, easy bookings, and continuous care.
              </p>
              <p className="text-muted">
                Whether you're seeking nearby hospitals or personal doctor consultations, we provide a modern,
                efficient, and user-friendly system that makes healthcare more accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 animate__animated animate__fadeInUp">What We Offer</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-4 animate__animated animate__zoomIn" key={index}>
                <div className="card shadow-sm h-100 p-4">
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-6 mb-4 mb-md-0 animate__animated animate__fadeInRight">
              <img
                src="aboutus2.webp"
                alt="Vision"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6 animate__animated animate__fadeInLeft">
              <h2 className="fw-bold">Our Vision</h2>
              <p className="text-muted">
                We envision a world where every individual can connect with the right healthcare provider at the
                right time, without barriers. CareConnect is a step towards smarter, more inclusive digital
                healthcare for all.
              </p>
              <p className="text-muted">
                Our team is committed to continuous innovation and excellence in digital healthcare services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Contact CTA */}
      <section className="py-5 text-center bg-white">
        <div className="container animate__animated animate__fadeInUp">
          <h2 className="fw-bold mb-3">Join the CareConnect Community</h2>
          <p className="text-muted mb-4">
            Whether you're a patient, doctor, or hospital — we're here to help you connect, collaborate, and care.
          </p>
          <a href="/contact" className="btn btn-outline-primary btn-lg">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
