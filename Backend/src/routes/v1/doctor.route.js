const express = require('express');
const { doctorController } = require('../../controllers');
const { doctorValidation } = require('../../validations');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post(
    '/:hospitalId',
    validate(doctorValidation.createDoctor),
    doctorController.createDoctor
);

router.get('/', doctorController.getAllDoctors);

router.get(
    '/:doctorId',
    validate(doctorValidation.getDoctorById),
    doctorController.getDoctorById
);

router.put(
    '/:doctorId',
    validate(doctorValidation.updateDoctor),
    doctorController.updateDoctor
);

router.delete(
    '/:doctorId',
    validate(doctorValidation.deleteDoctor),
    doctorController.deleteDoctor
);

module.exports = router;
