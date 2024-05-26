require("dotenv").config();

const config = {
    jwtPrivateKey:process.env.JWT_KEY
}

module.exports = config