import React from "react";
import "animate.css";
import "./review.css";
import { useTranslation } from "react-i18next";

const Review = () => {
  const { t } = useTranslation();

  const reviews = [
    { name: "Shreyes", review: t("reviews.shreyes") },
    { name: "Rahul", review: t("reviews.rahul") },
    { name: "Ayesha", review: t("reviews.ayesha") },
  ];

  return (
    <section className="reviews-section py-5">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold section-title animate__animated animate__fadeInDown">
          {t("reviews.sectionTitle")}
        </h2>
        <div className="row g-4 justify-content-center">
          {reviews.map((review, idx) => (
            <div
              className={`col-md-4 animate__animated animate__fadeInUp stagger-delay-${idx}`}
              key={idx}
            >
              <div className="card review-card shadow glassmorphism">
                <div className="card-body">
                  <p className="review-text fst-italic mb-3">"{review.review}"</p>
                  <h6 className="review-name fw-semibold mb-0">{review.name}</h6>
                  <small className="text-muted">{t("reviews.verified")}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
