import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const primaryColor = "#17a2b8";
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.setItem("rememberMe", "false");
    }

    try {
      const response = await axios.post("http://localhost:5000/v1/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, tokens } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);
        localStorage.setItem("accessTokenExpiration", new Date(tokens.access.expires));
        localStorage.setItem("role", user.role);

        const role = user.role.toLowerCase();

        if (role === "doctor") {
          navigate("/doc-home");
        } else if (role === "hospital") {
          navigate("/hos-home");
        } else {
          navigate("/user-home");
        }

        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed", error.response || error);
      setErrorMessage(t("login.error"));
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(to right, #e0f7fa, #ffffff)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "1rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold" style={{ color: primaryColor }}>
            {t("login.title")}
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold" style={{ color: "#333" }}>
                {t("login.email")}
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <MdEmail style={{ color: primaryColor }} />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold" style={{ color: "#333" }}>
                {t("login.password")}
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <RiLockPasswordFill style={{ color: primaryColor }} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3">
              <input
                className="form-check-input m-0"
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ transform: "scale(1.1)" }}
              />
              <label className="form-check-label mb-0" htmlFor="rememberMe" style={{ color: "#555", fontSize: "0.95rem" }}>
                {t("login.rememberMe")}
              </label>
            </div>

            {errorMessage && (
              <div className="mb-3 text-danger text-center">{errorMessage}</div>
            )}

            <div className="d-grid">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: primaryColor,
                  color: "#fff",
                  fontWeight: "600",
                  transition: "0.3s ease",
                }}
              >
                {t("login.loginBtn")}
              </button>
            </div>

            <div className="text-center mt-3">
              <a href="/register" className="text-decoration-none" style={{ color: primaryColor }}>
                {t("login.noAccount")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
