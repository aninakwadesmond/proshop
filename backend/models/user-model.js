require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');
const PasswordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const mongoose = require('mongoose');

const complexity = {
  symbol: 1,
  numeric: 1,
  min: 3,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  requirementCount: 2,
};

function validateUser(req) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: PasswordComplexity(complexity),
  }).unknown(true);

  return schema.validate(req);
}

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: PasswordComplexity(complexity),
  });

  return schema.validate(req);
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: String, default: false },
  },
  { timestamps: true }
);

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    config.get('jwtKey'),
    { expiresIn: '30d' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser, validateLogin };
