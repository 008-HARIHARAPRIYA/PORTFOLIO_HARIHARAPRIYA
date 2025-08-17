const express = require('express');
const router = express.Router();
const codingStatsController = require('../controllers/codingStatsController');

// Routes
router.post('/add', codingStatsController.createCodingStat);
router.get('/', codingStatsController.getAllCodingStats);
router.get('/:id', codingStatsController.getCodingStatById);
router.put('/:id', codingStatsController.updateCodingStat);
router.delete('/:id', codingStatsController.deleteCodingStat);

module.exports = router;
