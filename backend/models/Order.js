const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [
        {
            id: String,

            name: String,

            price: Number,

            qty: Number,

            image: String
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    paymentStatus: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports =
    mongoose.model("Order", orderSchema);