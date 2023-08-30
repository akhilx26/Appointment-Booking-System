const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const userbooking = require("../models/userBooking");

// email configuration 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

exports.userregister = async(req,res) => {
    const {fname,email,password} = req.body;
    if(!fname || !email || !password){
        res.status(400).json({error:"Please enter all input fields"});
    }
    try{
        const preuser = await users.findOne({email:email});
        if(preuser){
            res.status(400).json({error:"User already exists"});
        } else{
            const userregister = new users({
                fname, email, password
            });
            const storeData = await userregister.save();
            res.status(200).json(storeData);
        }
    }catch(error){
        res.status(400).json({error:"Invalid Details",error});
    }
}

exports.userOtpSend = async(req,res) => {
    // console.log(req.body);
    const {email} = req.body;
    if(!email){
        res.status(400).json({error:"Enter a valid email address"});
    }
    try{
        const preuser = await users.findOne({email:email});
        if(preuser){
            const OTP = Math.floor(100000+Math.random()*900000);
            const existEmail = await userotp.findOne({email:email});
            if(existEmail){
                const updateData = await userotp.findByIdAndUpdate({_id:existEmail._id},{
                    otp:OTP
                },{new:true}
                )
                await updateData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "OTP Validation",
                    text: `OTP: ${OTP}`
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("Error ",error);
                        res.status(400).json({error:"Email not sent"})
                    }else{
                        console.log("Email sent successfully");
                        res.status(200).json({message:"Email sent Successfully"});
                    }
                });
            }else{
                const saveOtpData = new userotp({
                    email,otp:OTP
                });
                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "OTP Validation",
                    text: `OTP: ${OTP}`
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error ",error);
                        res.status(400).json({error:"Email not sent"})
                    }else{
                        console.log("Email sent successfully");
                        res.status(200).json({message:"Email sent Successfully"});
                    }
                });
            }
        }else{
            res.status(400).json({error:"User does not exist"});
        }
    }catch(error){
        res.status(400).json({error:"Invalid Details",error});
    }
}

exports.userLogin = async(req,res) => {
    const {email,otp} = req.body;
    console.log(req.body);
    if(!otp || !email){
        res.status(400).json({error:"Enter OTP and Email"});    
    }
    try{
        const otpverification = await userotp.findOne({email:email});
        
        if(otpverification.otp===otp){
            const preuser = await users.findOne({email:email});
            const token = await preuser.generateAuthtoken();
            // console.log(token)
            res.status(200).json({message:"User Login Successful",userToken:token})
        }else{
            res.status(400).json({error:"Invalid Details",error})
        }
        
    }catch(error){
        res.status(400).json({error:"Error"});
    }
}

exports.userBooking = async(req,res) => {
    const {time,date} = req.body;
    // console.log(req.body);
    if(!time || !date){
        res.status(400).json({error:"Error"});
    }
    try{
        userbooking.findOne({time:time,date:date}).then(async function(result){
            if(result){
                res.status(201).json("Selected Slot is Unavailable!")
            }
            else{
                const bookSlot = new userbooking({
                time:time,
                date:date
                });
                const newBookedSlot = await bookSlot.save();
                res.status(200).json(newBookedSlot);
            }
        });
    }catch(error){
        res.status(400).json({error:"Invalid",error});
    }
}