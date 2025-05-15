const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const prescriptionController = require('../../controllers/prescription.controller');

const router = express.Router();

// Create a new prescription (requires consultation ID)
router.post(
    '/consultations/:consultationId',
    auth(),
    prescriptionController.createPrescription
);

// Get all prescriptions for a consultation (requires consultation ID)
router.get(
    '/consultations/:consultationId',
    auth(),
    prescriptionController.getConsultationPrescriptions
);

// Get/Update/Delete a prescription (uses prescription ID only)
router.get(
    '/:prescriptionId',
    auth(),
    prescriptionController.getPrescription
);

router.patch(
    '/:prescriptionId',
    auth(),
    prescriptionController.updatePrescription
);

router.delete(
    '/:prescriptionId',
    auth(),
    prescriptionController.deletePrescription
);

module.exports = router;
