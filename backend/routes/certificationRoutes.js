const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificationController');

router.post('/add', controller.createCertification);
router.get('/', controller.getAllCertifications);
router.get('/:id', controller.getCertificationById);
router.put('/:id', controller.updateCertification);
router.delete('/:id', controller.deleteCertification);

module.exports = router;
