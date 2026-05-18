import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <p className="auth-quote">
          "The best teams ship<br />
          fast and sleep well."
        </p>
        <p className="auth-quote-sub">
          A complete DevSecOps toolkit built for engineering teams
          who refuse to choose between speed and security.
        </p>
        <div className="auth-stats">
          <div>
            <div className="a-stat-num">12k+</div>
            <div className="a-stat-label">Engineers</div>
          </div>
          <div>
            <div className="a-stat-num">99.9%</div>
            <div className="a-stat-label">Uptime SLA</div>
          </div>
          <div>
            <div className="a-stat-num">500+</div>
            <div className="a-stat-label">Products</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
              Password
              <a href="/" style={{ color: "var(--terracotta)", textDecoration: "none", fontWeight: 400, letterSpacing: 0 }}>
                Forgot?
              </a>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <div className="auth-or">
          <div className="auth-or-line" />
          <span className="auth-or-text">or continue with</span>
          <div className="auth-or-line" />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {["🐙  GitHub", "🔵  Google"].map((label) => (
            <button key={label} style={{
              flex: 1, background: "var(--cream)", border: "1px solid var(--parchment)",
              borderRadius: "var(--radius-sm)", padding: "11px 10px", color: "var(--ink-muted)",
              cursor: "pointer", fontSize: "0.82rem", fontFamily: "var(--font-body)",
              transition: "var(--transition)",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "var(--stone)"; e.target.style.color = "var(--ink)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "var(--parchment)"; e.target.style.color = "var(--ink-muted)"; }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="auth-switch">
          No account yet? <Link to="/register">Create one free →</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;