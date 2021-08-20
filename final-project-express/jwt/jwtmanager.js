const jwt = require('jsonwebtoken');
const secret = 'TOPSECRET'

class JwtManager {

    generate(data) { // generate JWT
        const token = jwt.sign(data, secret);
        return token;
    }

    verify(token) { // verification
        const data = jwt.verify(token, secret);
        return data;
    }
}


module.exports = new JwtManager();