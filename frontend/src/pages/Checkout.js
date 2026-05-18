import React, { useState } from "react";

import API from "../services/api";

import { useCart }
from "../context/CartContext";

function Checkout() {

    const { cartItems } = useCart();

    const [address, setAddress] =
        useState("");

    const total =
        cartItems.reduce(
            (s, i) =>
                s + i.price * i.qty,
            0
        );



    const handleOrder = async () => {

    try {

        const res = await API.post(
            "/orders",
            {
                items: cartItems,
                totalAmount: total,
                address
            }
        );


        const data = res.data;


        const options = {

            key: data.key,

            amount:
                data.razorpayOrder.amount,

            currency: "INR",

            name:
                "DevSecOps Marketplace",

            description:
                "Secure Cloud Purchase",

            order_id:
                data.razorpayOrder.id,

            handler: function () {

                alert(
                    "Payment Successful"
                );

                window.location.href = "/";
            },

            theme: {
                color: "#111827"
            }
        };


        const razor =
            new window.Razorpay(options);

        razor.open();

    } catch (error) {

        alert("Payment failed");
    }
};



    return (

        <div className="checkout-page">

            <div className="checkout-left">

                <span className="page-eyebrow">
                    Secure payment
                </span>

                <h1 className="checkout-title">
                    Complete your order
                </h1>

                <p className="checkout-sub">

                    Your infrastructure tools
                    are ready for deployment.

                </p>



                <div className="checkout-items">

                    {cartItems.map((item) => (

                        <div
                            className="checkout-item"
                            key={item._id}
                        >

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div>

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    Qty: {item.qty}
                                </p>

                            </div>

                            <h4>
                                ₹
                                {(item.price * item.qty)
                                    .toLocaleString()}
                            </h4>

                        </div>
                    ))}

                </div>

            </div>



            <div className="checkout-right">

                <div className="checkout-box">

                    <h2>
                        Delivery details
                    </h2>

                    <textarea

                        placeholder=
                        "Enter delivery address"

                        value={address}

                        onChange={(e) =>
                            setAddress(
                                e.target.value
                            )
                        }

                        rows="5"
                    />



                    <div className="checkout-summary">

                        <div>

                            <span>Subtotal</span>

                            <span>
                                ₹
                                {total.toLocaleString()}
                            </span>

                        </div>

                        <div>

                            <span>Shipping</span>

                            <span
                                style={{
                                    color:
                                    "var(--sage)"
                                }}
                            >
                                Free
                            </span>

                        </div>

                        <div className="checkout-total">

                            <span>Total</span>

                            <span>
                                ₹
                                {total.toLocaleString()}
                            </span>

                        </div>

                    </div>



                    <button
                        className="checkout-btn"

                        onClick={handleOrder}
                    >
                        Proceed To Payment →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Checkout;