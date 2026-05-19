import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart }
from "../context/CartContext";
import { FaShoppingCart }
from "react-icons/fa";

function Navbar({ cartCount }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar" style={scrolled ? { boxShadow: "0 2px 20px rgba(28,24,20,0.08)" } : {}}>
      <Link to="/" className="navbar-brand">
        <div className="brand-mark">
          <div className="brand-mark-inner" />
        </div>
        <div>
          <div className="brand-text-main">DevSecOps Shop</div>
          <div className="brand-text-sub">Cloud Platform</div>
        </div>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive("/")}>Home</Link>
        <button
  className="nav-link"
  onClick={() => {
    document
      .getElementById("featured-products")
      .scrollIntoView({
        behavior: "smooth"
      });
  }}
>
  Products
</button>
        <Link to="/services" className="nav-link">Services</Link>

        {!token ? (
          <>
            <Link to="/login" className={isActive("/login")}>Sign in</Link>
            <Link to="/register" className="btn-nav">Get started →</Link>
          </>
        ) : (
          <>
<Link to="/cart" className="nav-cart">

  <FaShoppingCart />

  {cartItems.length > 0 && (

    <span className="cart-count">
      {cartItems.length}
    </span>

  )}

</Link>
            <button onClick={logout} className="btn-logout">Sign out</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;