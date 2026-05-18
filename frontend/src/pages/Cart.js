import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useCart }
from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    updateQty
  } = useCart();

  const items = cartItems;

  const [promo, setPromo] = useState("");

  const [promoApplied, setPromoApplied] =
    useState(false);

  const subtotal = items.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const discount = promoApplied
    ? Math.floor(subtotal * 0.1)
    : 0;

  const total = subtotal - discount;

  return (

    <div className="cart-page">

      <span className="page-eyebrow">
        Your cart
      </span>

      <h1 className="page-title">
        Shopping cart
      </h1>

      {items.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            padding: "80px 20px"
          }}
        >

          <div
            style={{
              fontFamily:
                "var(--font-display)",

              fontSize: "5rem",

              color:
                "var(--parchment)",

              marginBottom: "16px"
            }}
          >
            ☁
          </div>

          <p
            style={{
              fontFamily:
                "var(--font-display)",

              fontSize: "1.5rem",

              color:
                "var(--ink-muted)",

              marginBottom: "28px"
            }}
          >
            Your cart is empty
          </p>

          <Link
            to="/"
            className="btn-primary"
          >
            Browse products →
          </Link>

        </div>

      ) : (

        <div className="cart-layout">

          {/* ITEMS */}

          <div className="cart-items-box">

            <div className="cart-box-head">

              <span className="cart-box-title">

                {items.length} item
                {items.length !== 1
                  ? "s"
                  : ""}

              </span>

            </div>

            {items.map((item) => (

              <div
                className="cart-item"
                key={item._id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">

                  <div className="cart-item-cat">
                    {item.category}
                  </div>

                  <div className="cart-item-name">
                    {item.name}
                  </div>

                </div>

                <div className="qty-row">

                  <button
                    className="qty-btn"

                    onClick={() =>
                      updateQty(
                        item._id,
                        -1
                      )
                    }
                  >
                    −
                  </button>

                  <span className="qty-val">
                    {item.qty}
                  </span>

                  <button
                    className="qty-btn"

                    onClick={() =>
                      updateQty(
                        item._id,
                        1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <div className="cart-item-price">

                  ₹
                  {(item.price * item.qty)
                    .toLocaleString()}

                </div>

                <button
                  className="cart-item-del"

                  onClick={() =>
                    removeFromCart(
                      item._id
                    )
                  }
                >
                  ✕
                </button>

              </div>
            ))}

          </div>

          {/* SUMMARY */}

          <div className="summary-box">

            <div className="summary-h">
              Order summary
            </div>

            <div className="summary-row">

              <span>Subtotal</span>

              <span>
                ₹{subtotal.toLocaleString()}
              </span>

            </div>

            {promoApplied && (

              <div className="summary-row discount">

                <span>
                  Promo (DEVSEC10)
                </span>

                <span>
                  −₹
                  {discount.toLocaleString()}
                </span>

              </div>
            )}

            <div className="summary-row">

              <span>Shipping</span>

              <span
                style={{
                  color: "var(--sage)"
                }}
              >
                Free
              </span>

            </div>

            <div className="summary-row total">

              <span>Total</span>

              <span>
                ₹{total.toLocaleString()}
              </span>

            </div>

            <div className="promo-row">

              <input
                type="text"

                placeholder="Promo code"

                className="promo-input"

                value={promo}

                onChange={(e) =>
                  setPromo(e.target.value)
                }
              />

              <button
                className="promo-apply"

                onClick={() =>
                  promo.toUpperCase() ===
                    "DEVSEC10" &&
                  setPromoApplied(true)
                }
              >
                Apply
              </button>

            </div>

<button
  className="btn-checkout"

  onClick={() =>
    window.location.href =
      "/checkout"
  }
>
  Proceed to checkout →
</button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;