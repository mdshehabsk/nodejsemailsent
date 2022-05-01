const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../schema/userSchema");

const userRegister = async (req, res, next) => {
  try {

    const { username, email, password, cpassword } = req.body;
    const userExist = await user.findOne({ email });
    if (userExist) {
      res.json({ message: "Email is already exist", path: ["email"] });
    } else if (password !== cpassword) {
      res.status(422).json({
        message: "password and confirm password are not same",
        path: ["password"],
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const hashCpassword = await bcrypt.hash(cpassword, 10);
      await user({
        username,
        email,
        password: hashPassword,
        cpassword: hashCpassword,
      }).save();

      res.status(201).json({
        message: "Registration successfull",
        success: true,
      });
    }
  } catch (err) {
    next(err);
  }
};
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await user.findOne({ email });
    if (!userExist) {
      res.json({ message: "user not exist", path:['email'] });
    } else {
      const auth = await bcrypt.compare(password, userExist.password);
      const token = await jwt.sign(req.body, process.env.JWT_SIGN);
      if (!auth) {
        res
          .status(201)
          .json({ message: "invalid username or password", path:['password'] });
      } else {
        
        res
          .status(201)
          .cookie('crud',token)
          .json({ message: "Login successfull", success: true });
      }
    }
  } catch (err) {
    next(err);
  }
};

const userEdit = async (req, res, next) => {
  try {
    const { username, email, password, cpassword } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const hashCpassword = await bcrypt.hash(cpassword, 10);
    const userExist = await user.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        password: hashPassword,
        cpassword: hashCpassword,
      },
      { new: true }
    );
    res.status(201).json({ message: "User update successfull", success: true });
  } catch (err) {
    next(err);
  }
};
const userDelete = async (req, res, next) => {
  try {
    await user.findByIdAndRemove(req.params.id);
    res.status(201).json({ message: "User Delete successfull", success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { userRegister, userLogin, userEdit, userDelete };
