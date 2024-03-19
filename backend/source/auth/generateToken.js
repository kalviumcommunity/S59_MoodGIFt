require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(user_id, hours) {
  const token = jwt.sign({ userId: user_id }, process.env.SECRET_KEY, {
    expiresIn: `${hours}h`,
  });

  return token;
}

module.exports = { generateToken };
