/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
    // res.send('hello');
});

router.post('/', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, gender, occupation, ssn } = _req.body;

    const patient = patientService.addPatient(
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn
    );
    res.send(patient);
});
export default router;
