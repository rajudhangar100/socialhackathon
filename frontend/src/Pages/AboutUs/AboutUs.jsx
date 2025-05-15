import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './AboutUs.css';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  const features = t('about.features', { returnObjects: true });

  return (
    <div className="about-wrapper bg-light text-dark">
      {/* Hero Section */}
      <section className="about-hero text-center py-5 bg-white">
        <div className="container animate__animated animate__fadeInDown">
          <h1 className="display-4 fw-bold">{t('about.title')}</h1>
          <p className="lead text-muted mt-3">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0 animate__animated animate__fadeInLeft">
              <img src="/aboutus1.jpg" alt="Mission" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6 animate__animated animate__fadeInRight">
              <h2 className="fw-bold">{t('about.missionTitle')}</h2>
              <p className="text-muted">{t('about.missionText1')}</p>
              <p className="text-muted">{t('about.missionText2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 animate__animated animate__fadeInUp">{t('about.featuresTitle')}</h2>
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
              <img src="aboutus2.webp" alt="Vision" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6 animate__animated animate__fadeInLeft">
              <h2 className="fw-bold">{t('about.visionTitle')}</h2>
              <p className="text-muted">{t('about.visionText1')}</p>
              <p className="text-muted">{t('about.visionText2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-5 text-center bg-white">
        <div className="container animate__animated animate__fadeInUp">
          <h2 className="fw-bold mb-3">{t('about.ctaTitle')}</h2>
          <p className="text-muted mb-4">{t('about.ctaText')}</p>
          <a href="/contact" className="btn btn-outline-primary btn-lg">
            {t('about.contactButton')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
