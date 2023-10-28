import dotenv from 'dotenv';
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();

const orders = (req, res) => {
    console.log("HI");
    console.log("HI",req.body.amount);
    const instance = new Razorpay({
        key_id: process.env.PKEY,
        key_secret: process.env.PSEC,
    });

    const options = {
        amount: req.body.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
    };

    instance.orders.create(options, (err, order) => {
        if (err) {
            return res.send({ code: 500, message: "server Error" });
        }
        return res.send({ code: 200, message: "order done", data: order });
    });
};

const verify = (req, res) => {
    const body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_parent_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.PSEC)
        .update(body.toString())
        .digest('hex');
    const response = { "signatureIsValid": "false" };

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: "sigin valid" });
    } else {
        res.send({ code: 500, message: "sigin invalid" });
    }
};

export { orders, verify };
