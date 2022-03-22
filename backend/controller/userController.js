const user = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const home = async (req,res,next)=>{
    const findUser = await user.find()
    res.json({message:findUser,success:true})
}

const userRegister = async (req, res, next) => {
  const { username, email, phone, password, cpassword } = req.body;
  const userExist = await user.findOne({ email });
  if (password !== cpassword) {
    res.json({ message: "password are not same", success: false });
  } else if (userExist) {
    res.json({ message: "Email is already exist", success: false });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const hashCpassword = await bcrypt.hash(cpassword, 10);
    await user({
      username,
      email,
      phone,
      password: hashPassword,
      cpassword: hashCpassword,
    }).save();
    let data;

    ejs.renderFile("./views/email.ejs", { user:username,email,phone }, (err, str) => {
      if (err) {
        console.log(err);
      } else {
        data = str;
      }
    });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Registration successfull",
      html: data,
    };
    transporter.sendMail(mailOptions, (err) => {
      if (!err) {
        console.log("email send");
      } else {
        next(err);
      }
    });
    res.json({ message: "user register successfull", success: true });
  }
};

module.exports = {
  userRegister,
  home
};
