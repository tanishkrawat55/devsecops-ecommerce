import React, { useState, useEffect } from "react";
import API from "../services/api";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then((res) => {
                if (res.data?.length) setProducts(res.data);
            })
            .catch(() => {});
    }, []);

    return (
        <div style={{
            padding: "40px",
            color: "white"
        }}>
            <h1>Products Page</h1>
            <p>Browse all products here.</p>

            <ul>
                {products.map((p) => (
                    <li key={p._id}>{p.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
