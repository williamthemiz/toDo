var jwt = require('jwt-simple');
var moment = require('moment');
var conf = require('../config');

function crearToken(user)
{
    var payload = 
    {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix()

    };

    return jwt.encode(payload,conf.secret);
};

function devolverId(token)
{
    var id = jwt.decode(token,conf.secret);

    return id.sub;
};

module.exports = {
    crearToken,
    devolverId
}