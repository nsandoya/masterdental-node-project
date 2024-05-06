const jwt = require('jsonwebtoken');

function generateToken(user){
    const payload = {
        userId: user._id,
        email: user.email
    };
    //console.log("payload",payload)

    const token = jwt.sign(payload, process.env.KEY, {expiresIn: "10m"});
    return token
}

module.exports = {generateToken}