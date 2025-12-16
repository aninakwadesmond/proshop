const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { Router } = require('express');
const { validateUser, User, validateLogin } = require('../models/user-model');
const { authLogin, authAdmin } = require('../auth/authUser');
const { default: mongoose } = require('mongoose');

const userRoute = Router();

// @access public - register
userRoute.post('/', async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error)
    res
      .status(400)
      .json({ message: error.details[0].message, status: 'error' });

  const user = new User(_.pick(req.body, ['name', 'email', 'password']));
  console.log('new user', user, req.body);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);

  user.password = hashed;

  const token = user.genAuthToken();

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
  });
  console.log(token);
  const respond = await user.save();
  console.log('final respond', respond);
  res.json(respond);
});

// @access private - login
userRoute.post('/login', async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  console.log(email, password);

  const userEmail = await User.findOne({ email });
  console.log(userEmail);
  if (!userEmail)
    res
      .status(401)
      .json({ message: 'Invalid email or password', status: 'failed' });

  const isPassword = await bcrypt.compare(password, userEmail.password);

  if (!isPassword)
    return res
      .status(401)
      .json({ message: 'Invalid email or password', status: 'failed' });

  const token = userEmail.genAuthToken();

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(userEmail);
});

// @access private -logout
userRoute.get('/logout', authLogin, (req, res, next) => {
  console.log('hi', res.user);
  const { _id: id } = res.user;
  console.log('req.id', res.user);
  // const isValid = mongoose.isValidObjectId(id);
  // if (!isValid) res.status.json({ message: 'Logout unsuccefull' });
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  res.status(200).json({ message: 'succefully logout', status: 200 });
});

// @access private- getUserprofile
userRoute.get('/me', authLogin, async (req, res, next) => {
  const { id } = res.user;
  const user = await User.findById(id);

  if (!user)
    res.status(400).json({ message: 'Invalid user', status: 'failed' });

  res.status(200).json(user);
});

// @access private - updateProfile
userRoute.put('/me', authLogin, async (req, res, next) => {
  const update = await User.findByIdAndUpdate(res.user.id, req.body, {
    new: true,
  });

  res.status(200).json(update);
});

// @access private- getUsers
userRoute.get('/all', [authLogin, authAdmin], async (req, res, next) => {
  const users = await User.find({}).select('-password');
  // if(!user) return res.status(400).json({message:''})
  res.status(200).json(users);
});

// @access private - deleteUser
userRoute.delete('/:id', [authLogin, authAdmin], async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  // no use since it delete immediately
  // if (user.isAdmin)
  //   return res
  //     .status(301)
  //     .json({ message: 'canoot delete admin', status: 301 });
  if (!user)
    return res
      .status(400)
      .json({ message: 'User does not exist', status: 'failed' });
  res.status(200).json({ message: 'succefully deleted', status: 'deleted' });
});

// @access private - getUserById
userRoute.get('/:id', [authLogin, authAdmin], async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    res.status(400).json({ message: 'Invalid user', status: 'failed' });

  res.status(200).json(user);
});

// @access update - updateUSer
userRoute.put('/:id', [authLogin, authAdmin], async (req, res, next) => {
  const update = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!update) return res.status(400).json({ message: 'Unsuccefully update' });
  res.status(200).json({ message: 'successfully updated', status: 201 });
});

module.exports = userRoute;
