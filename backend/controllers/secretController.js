const checkSecretKey = (req, res) => {
  const { key } = req.body;  // <-- takes "key" from request body
  if (key === process.env.SECRET_KEY) {  // <-- compares with your .env
    return res.json({ success: true });  // <-- authorized response
  } else {
    return res.status(401).json({ success: false, message: 'Invalid key' });  // <-- unauthorized
  }
};

module.exports = { checkSecretKey };
