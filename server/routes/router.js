const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");

router.post("/user/register",controllers.userregister);
router.post("/user/otp",controllers.userOtpSend);
router.post("/user/login",controllers.userLogin);
router.post("/user/booking",controllers.userBooking);

module.exports = router;