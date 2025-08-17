const express = require('express');
const router = express.Router();
const { checkSecretKey } = require('../controllers/secretController');

router.post('/validate', checkSecretKey);

module.exports = router;
