const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");

    if (!authorization) {
      return res.status(403).json({
        message: "A token is required for authentication",
      });
    }

    const splitAuthorization = authorization.split(" ");
    const token = splitAuthorization[1];

    let decoded ;

    try {
      decoded = jwt.verify(token, process.env.SECRECT_KEY);
     
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    const user = await User.findOne({ email: decoded.email });
    req.user = user;

    next()

  } catch (error) {

    return res.status(500).json({
        message:error.message
    });

  };
};

module.exports = verifyToken;
