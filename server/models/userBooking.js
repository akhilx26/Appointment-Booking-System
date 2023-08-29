const mongoose = require("mongoose");

const userBookingSchema = new mongoose.Schema({
    time:{
        type: String
    },
    date:{
        type: String
    }
});

const userbooking = new mongoose.model("userBooking",userBookingSchema);

module.exports = userbooking;