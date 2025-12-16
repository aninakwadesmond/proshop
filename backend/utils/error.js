function error(err, req, res, next) {
  res.status(500).json({ message: 'Something went wrong' });
}

module.exports = error;
