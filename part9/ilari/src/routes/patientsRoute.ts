/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
    // res.send('hello');
});

router.post('/', (_req, res) => {
    try {
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
    } catch (err: unknown) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;
