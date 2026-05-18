import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const S_COLOR = ["", "#c4622d", "#c9933a", "#7a8c7e", "#5a8c6a"];
const S_LABEL = ["", "Weak", "Fair", "Good", "Strong"];

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const pw = formData.password;
  const s  = strength(pw);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (s < 2) { setError("Please choose a stronger password."); return; }
    setLoading(true);
    try {
      const res = await API.post("/auth/register", formData);
      setSuccess(res.data.message || "Account created! Redirecting…");
      setTimeout(() => (window.location.href = "/login"), 2000);
    }catch (err) {

  console.log(err.response);

  setError(
    err.response?.data?.message ||
    "Registration failed. Try again."
  );
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <p className="auth-quote">
          "Infrastructure that<br />
          just <em style={{ fontStyle: "italic" }}>works</em>."
        </p>
        <p className="auth-quote-sub">
          Join thousands of engineers who've replaced weeks of infrastructure
          boilerplate with a single deploy command.
        </p>
        <div className="auth-stats">
          <div>
            <div className="a-stat-num">8 min</div>
            <div className="a-stat-label">Avg. deploy</div>
          </div>
          <div>
            <div className="a-stat-num">50+</div>
            <div className="a-stat-label">AWS regions</div>
          </div>
          <div>
            <div className="a-stat-num">0</div>
            <div className="a-stat-label">Setup cost</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Free forever. No credit card required.</p>

        <form onSubmit={handleSubmit}>
          {error   && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="form-group">
            <label className="form-label">Full name</label>
            <input type="text" name="name" placeholder="Your name" className="form-input"
              value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input type="email" name="email" placeholder="you@company.com" className="form-input"
              value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" placeholder="Min 8 characters" className="form-input"
              value={pw} onChange={handleChange} required />
            {pw && (
              <>
                <div className="strength-bar">
                  <div className="strength-fill" style={{ width: `${(s / 4) * 100}%`, background: S_COLOR[s] }} />
                </div>
                <div className="strength-label" style={{ color: S_COLOR[s] }}>{S_LABEL[s]}</div>
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "20px" }}>
            <input type="checkbox" id="terms" required
              style={{ marginTop: "3px", accentColor: "var(--ink)", cursor: "pointer" }} />
            <label htmlFor="terms" style={{ fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.6, cursor: "pointer" }}>
              I agree to the{" "}
              <a href="/" style={{ color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}>Terms of Service</a>
              {" "}and{" "}
              <a href="/" style={{ color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Creating account…" : "Create account →"}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in →</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;