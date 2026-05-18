const Order = require("../models/Order");

const razorpay =
require("../config/razorpay");


// CREATE ORDER
exports.createOrder = async (
    req,
    res
) => {

    try {

        const {
            items,
            totalAmount,
            address
        } = req.body;

        const cleanItems = items.map(item => ({

    id: item.id || "",

    name: item.name,

    price: item.price,

    qty: item.qty,

    image: item.image

}));



        const options = {

            amount:
                totalAmount * 100,

            currency: "INR",

            receipt:
                `receipt_${Date.now()}`
        };



        const razorpayOrder =
            await razorpay.orders.create(
                options
            );



        const order =
            await Order.create({

                items: cleanItems,

                totalAmount,

                address,

                paymentStatus:
                    "Pending"
            });



        console.log(
            "Razorpay Order Created:",
            razorpayOrder
        );



        res.status(201).json({

            success: true,

            order,

            razorpayOrder,

            key:
                process.env
                .RAZORPAY_KEY_ID
        });

    } catch (error) {

    console.log(
        "RAZORPAY ERROR:",
        error
    );

    res.status(500).json({
        message: error.message
    });
}
};