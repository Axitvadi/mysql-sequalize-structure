const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that required fields are provided
    if (!name || !email || !password) {
      return res.status(401).json({
        message:"required fields are missing"
      });
    };

    // Check if user with same email already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({
        message:"user already exists"
      });
    };

    // Create new user in the database
    let hashPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    // Creat JWT token
    const token = jwt.sign(
      {email},process.env.SECRECT_KEY,{
        expiresIn: "1hr",
      });

    await newUser.save();

    return res.status(200).json({
      success:true,
      data:newUser,
      Token:token,
      message:"user register successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    // const { email, password } = req.body;
    const user = {
      email : req.body.email,
      password : req.body.password
    };

    const userExisting = await User.findOne({ where: { email: req.body.email } });
    if (!userExisting) {
      return res.status(404).json({
        message:"user already exists with same email"
      })
    };
    const valid = await bcrypt.compare(req.body.password, userExisting.password);
    if (!valid) {
      return res.status(401).json({
        message:"Invalid password"
      })
    };
    const token = jwt.sign(
      {email: req.body.email},process.env.SECRECT_KEY,{
        expiresIn: "1hr",
      }
    );
    return res.status(200).json({
      success:true,
      data:user,
      Token:token,
      message:"user logined successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();

    const users = user.map((user) => {
      return {
        name: user.name,
        email: user.email,
        password: user.password,
      };
    });
    return res.status(200).json({
      success: true,
      data: users,
      message: "all user found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};

exports.deletUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userDelete = await User.destroy({ where: { id } });

    return res.status(200).json({
      success:true,
      data:userDelete,
      message:"user delet successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    return res.status(200).json({
      success: true,
      data:user,
      message: "user updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};
