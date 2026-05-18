import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart }
from "../context/CartContext";

/* ── MOCK DATA ─────────────────────────────────────────────────────── */
const MOCK_PRODUCTS = [
  {
    _id: "1", name: "Docker Enterprise Pack", category: "Containers",
    description: "Production-ready container images, CI/CD templates, and Kubernetes manifests for scalable deployments.",
    price: 4999, originalPrice: 7999, badge: "hot", rating: 4.8,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
    tags: ["Docker", "K8s", "CI/CD"],
  },
  {
    _id: "2", name: "AWS Security Suite", category: "Security",
    description: "Terraform modules for IAM, VPC, WAF, and CloudTrail. Security-first infrastructure from day one.",
    price: 8499, originalPrice: 12999, badge: "new", rating: 4.9,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
    tags: ["AWS", "Terraform", "IAM"],
  },
  {
    _id: "3", name: "Kubernetes Cluster Kit", category: "Orchestration",
    description: "Complete K8s setup with Helm charts, monitoring, autoscaling, and multi-cluster federation.",
    price: 6299, badge: "sale", rating: 4.7,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tags: ["K8s", "Helm", "Monitoring"],
  },
  {
    _id: "4", name: "Terraform Cloud Starter", category: "IaC",
    description: "IaC blueprints for multi-region AWS, GCP, and Azure deployments with built-in state management.",
    price: 3799, originalPrice: 5499, badge: null, rating: 4.6,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    tags: ["Terraform", "AWS", "GCP"],
  },
  {
    _id: "5", name: "DevOps Pipeline Bundle", category: "CI/CD",
    description: "Pre-built Jenkins, GitHub Actions, and ArgoCD workflows for full GitOps automation.",
    price: 5599, badge: "new", rating: 4.8,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80",
    tags: ["GitOps", "ArgoCD", "Jenkins"],
  },
  {
    _id: "6", name: "Observability Stack", category: "Monitoring",
    description: "Prometheus, Grafana, Loki, and Jaeger configured for cloud-native full-stack observability.",
    price: 4299, originalPrice: 6299, badge: "sale", rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tags: ["Prometheus", "Grafana", "Tracing"],
  },
];

const SERVICES = [
  { num: "01", title: "Zero-Trust Security", desc: "End-to-end security with RBAC, mTLS, OPA policies, and automated vulnerability scanning baked into every deployment." },
  { num: "02", title: "Cloud Infrastructure", desc: "Multi-cloud Terraform modules for AWS, GCP, and Azure with cost optimisation and auto-scaling built in from day one." },
  { num: "03", title: "GitOps Automation", desc: "Declarative deployment workflows with ArgoCD, Flux, and GitHub Actions for zero-downtime, auditable releases." },
  { num: "04", title: "Full Observability", desc: "Real-time metrics, distributed tracing, structured logging, and intelligent alerting with ML-driven anomaly detection." },
  { num: "05", title: "Container Services", desc: "Managed Kubernetes clusters, service mesh, and container security with Falco, OPA Gatekeeper, and Trivy scanning." },
  { num: "06", title: "Performance Tuning", desc: "Horizontal and vertical autoscaling, CDN optimisation, and database tuning for peak throughput at any scale." },
];

const TECH = [
  { emoji: "🐳", name: "Docker" }, { emoji: "☸️", name: "Kubernetes" },
  { emoji: "🌿", name: "Terraform" }, { emoji: "☁️", name: "AWS" },
  { emoji: "🔧", name: "Jenkins" }, { emoji: "🐙", name: "GitHub Actions" },
  { emoji: "📦", name: "ArgoCD" }, { emoji: "📊", name: "Prometheus" },
  { emoji: "📈", name: "Grafana" }, { emoji: "🔒", name: "Vault" },
  { emoji: "🕸️", name: "Istio" }, { emoji: "🐍", name: "Ansible" },
];

const TESTIMONIALS = [
  { text: "Deployment time went from two hours to under eight minutes. The Kubernetes kit alone saved us weeks of setup.", name: "Arjun Mehta", role: "CTO, CloudNest", initials: "AM" },
  { text: "The security suite flagged three critical misconfigurations on day one. Best DevSecOps investment we've made.", name: "Priya Sharma", role: "DevOps Lead, FinStack", initials: "PS" },
  { text: "Terraform modules are clean, well-documented, and production-grade. Multi-region deployed in a single afternoon.", name: "Rahul Verma", role: "Infrastructure Engineer, ScalePay", initials: "RV" },
];

const PIPELINE = [
  { icon: "✦", label: "Commit", state: "done" },
  { icon: "✦", label: "SAST", state: "done" },
  { icon: "✦", label: "Build", state: "done" },
  { icon: "✦", label: "Test", state: "active" },
  { icon: "✦", label: "Package", state: "pending" },
  { icon: "✦", label: "Deploy", state: "pending" },
  { icon: "✦", label: "Monitor", state: "pending" },
];

const MARQUEE = [
  "Zero-Trust Security", "Multi-Cloud Ready", "GitOps Automation",
  "Real-Time Observability", "Auto-Scaling", "Container Native",
  "Secrets Management", "Infrastructure as Code", "Automated Testing",
  "Zero-Trust Security", "Multi-Cloud Ready", "GitOps Automation",
  "Real-Time Observability", "Auto-Scaling", "Container Native",
];

/* ── SUBCOMPONENTS ─────────────────────────────────────────────────── */
function Stars({ rating = 4.5 }) {
  return (
    <div className="card-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.floor(rating) ? "star" : "star empty"}>★</span>
      ))}
      <span className="star-count">({Math.floor(rating * 20)})</span>
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2600); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="toast">
      <span>✓</span>
      <span>{msg}</span>
    </div>
  );
}

function ProductCard({ product, delay = 0, onAdd }) {
  return (
    <div className="product-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="card-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className={`card-badge ${product.badge}`}>{product.badge}</span>}
        <button className="card-wishlist" title="Save">♡</button>
      </div>
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <Stars rating={product.rating} />
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>
        {product.tags && (
          <div className="card-tags">
            {product.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        )}
        <div className="card-footer">
          <div>
            <div className="price-now">₹{product.price?.toLocaleString()}</div>
            {product.originalPrice && <div className="price-was">₹{product.originalPrice?.toLocaleString()}</div>}
          </div>
          <button className="btn-add" onClick={() => onAdd(product)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

/* ── HOME ──────────────────────────────────────────────────────────── */
function Home() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [toast, setToast] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const { addToCart } = useCart();

  const FILTERS = ["All", "Containers", "Security", "Orchestration", "IaC", "CI/CD", "Monitoring"];

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => { if (res.data?.length) setProducts(res.data); })
      .catch(() => {});
  }, []);

  const filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.category === activeFilter);

const handleAdd = (product) => {

  addToCart(product);

  setToast(
    `"${product.name}" added to cart`
  );
};

  return (
    <>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* ── HERO ── */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">Cloud-Native DevSecOps</div>
          <h1 className="hero-title">
            Ship faster.<br />
            Stay <em>secure</em>.<br />
            Scale freely.
          </h1>
          <p className="hero-desc">
            The premier marketplace for cloud-native DevSecOps tools, templates,
            and infrastructure modules — trusted by engineers at scale.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">Browse products →</Link>
            <Link to="/register" className="btn-secondary">Start free</Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-label">Products</div>
            </div>
            <div>
              <div className="hero-stat-num">12k+</div>
              <div className="hero-stat-label">Engineers</div>
            </div>
            <div>
              <div className="hero-stat-num">99.9%</div>
              <div className="hero-stat-label">Uptime SLA</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-stack">
            <img
              className="hero-img-main"
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
              alt="Cloud infrastructure"
            />
            <img
              className="hero-img-accent"
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80"
              alt="Server deployment"
            />
            <div className="hero-float-card">
              <div className="float-icon">🚀</div>
              <div>
                <div className="float-label">Avg. deploy time</div>
                <div className="float-value">8 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="strip">
        <div className="strip-track">
          {MARQUEE.map((item, i) => (
            <div className="strip-item" key={i}>
              <span className="dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── PIPELINE ── */}
      <section className="pipeline-section">
        <div className="pipeline-inner">
          <div className="section-eyebrow">CI/CD Pipeline</div>
          <h2 className="section-title">Your workflow, <em>automated</em></h2>
          <p className="section-desc">From code commit to production in minutes, with security checks built into every stage.</p>
          <div className="pipeline-track">
            {PIPELINE.map((stage, i) => (
              <div className={`pipeline-step ${stage.state}`} key={i}>
                <div className={`step-dot ${stage.state}`}>{stage.icon}</div>
                <div className="step-name">{stage.label}</div>
                <div className={`step-st ${stage.state}`}>
                  {stage.state === "done" ? "Passed" : stage.state === "active" ? "Running…" : "Waiting"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="products-section">
        <div className="products-header">
          <div>
            <div className="section-eyebrow">Marketplace</div>
            <h2 className="section-title">Featured <em>products</em></h2>
          </div>
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {filtered.map((p, i) => (
            <ProductCard key={p._id} product={p} delay={i * 70} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="services-inner">
          <div className="section-eyebrow">What we offer</div>
          <h2 className="section-title">Core <em>services</em></h2>
          <p className="section-desc">Everything your team needs to build, deploy, and secure cloud-native applications.</p>
          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <div className="service-card" key={i}>
                <div className="service-num">{svc.num}</div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
                <a href="/" className="service-link">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE ROW ── */}
      <section className="feature-row">
        <img
          className="feature-image"
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
          alt="Team at work"
        />
        <div>
          <div className="section-eyebrow">Why teams choose us</div>
          <h2 className="section-title">Built for <em>real</em> engineering teams</h2>
          <p className="section-desc">Every product in our catalog is battle-tested in production environments before it reaches you.</p>
          <div className="feature-points">
            <div className="feature-point">
              <div className="point-icon">🛡️</div>
              <div>
                <div className="point-title">Security by default</div>
                <div className="point-desc">Every template ships with CIS benchmarks, RBAC policies, and vulnerability scanning preconfigured.</div>
              </div>
            </div>
            <div className="feature-point">
              <div className="point-icon">⚡</div>
              <div>
                <div className="point-title">Production-grade, day one</div>
                <div className="point-desc">Skip months of boilerplate. Our modules are designed to run in live environments from the first apply.</div>
              </div>
            </div>
            <div className="feature-point">
              <div className="point-icon">📖</div>
              <div>
                <div className="point-title">Deeply documented</div>
                <div className="point-desc">Architecture diagrams, runbooks, and troubleshooting guides included with every product.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="tech-section">
        <div className="tech-inner">
          <div className="section-eyebrow">Technology</div>
          <h2 className="section-title">Industry-standard <em>stack</em></h2>
          <p className="section-desc" style={{ margin: "12px auto 0" }}>Built on the tools your team already knows and trusts.</p>
          <div className="tech-row">
            {TECH.map((t, i) => (
              <div className="tech-pill" key={i}>
                <span className="tech-emoji">{t.emoji}</span>
                {t.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-eyebrow">What engineers say</div>
        <h2 className="section-title">Trusted by <em>teams worldwide</em></h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <span className="t-mark">"</span>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to ship <em>with confidence</em>?</h2>
        <p className="cta-desc">Join 12,000+ engineers building secure, scalable cloud-native applications.</p>
        <div className="cta-actions">
          <Link to="/register" className="btn-primary">Start for free →</Link>
          <Link to="/products" className="btn-secondary">Browse products</Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">DevSecOps Shop</div>
            <p className="footer-brand-desc">The premier marketplace for cloud-native tools, templates, and infrastructure modules.</p>
            <div className="footer-socials">
              <a href="/" className="social-btn">𝕏</a>
              <a href="/" className="social-btn">in</a>
              <a href="/" className="social-btn">gh</a>
              <a href="/" className="social-btn">yt</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Products</div>
            <ul className="footer-links">
              <li><a href="/">Docker Packs</a></li>
              <li><a href="/">K8s Bundles</a></li>
              <li><a href="/">Terraform Modules</a></li>
              <li><a href="/">CI/CD Templates</a></li>
              <li><a href="/">Security Tools</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <ul className="footer-links">
              <li><a href="/">Documentation</a></li>
              <li><a href="/">API Reference</a></li>
              <li><a href="/">Status</a></li>
              <li><a href="/">Changelog</a></li>
              <li><a href="/">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><a href="/">About</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">Careers</a></li>
              <li><a href="/">Privacy</a></li>
              <li><a href="/">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 DevSecOps Shop. All rights reserved.</span>
          <div className="footer-pills">
            <span className="footer-pill">AWS</span>
            <span className="footer-pill">K8S</span>
            <span className="footer-pill">DOCKER</span>
            <span className="footer-pill">TERRAFORM</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;