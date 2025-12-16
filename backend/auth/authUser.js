require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');

function authLogin(req, res, next) {
  const token = req.cookies?.jwt;
  console.log('token', token);
  if (!token)
    res
      .status(403)
      .json({ message: 'UnAuthorized user.Invalid token!', status: 'failed' });

  try {
    const decode = jwt.decode(token, config.get('jwtKey'));

    res.user = decode;
    console.log(res.user);
    next();
  } catch (error) {
    res.status(404).json({ message: error, status: error.message });
  }
}

function authAdmin(req, res, next) {
  const { isAdmin } = res.user;

  if (isAdmin === 'false')
    return res.status(403).json({ message: 'Forbidden', status: 'failed' });
  next();
}

module.exports = { authLogin, authAdmin };
