/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewMedicalEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
    // res.send('hello');
});

router.get('/:id', (_req, res) => {
    const id = _req.params.id;
    const entry = patientService.getPatientEntry(id);
    if (entry) {
        res.send(entry);
    } else res.status(400).send('Patient info are not found!');
});

router.post('/', (_req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const { name, dateOfBirth, gender, occupation, ssn } = _req.body;
        const newPatient = toNewPatientEntry(_req.body);

        const patient = patientService.addPatient(newPatient);
        console.log(patient);
        res.send(patient);
    } catch (err: unknown) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (_req, res) => {
    console.log(_req.body);
    try {
        const patientId = _req.params.id;
        const entry = toNewMedicalEntry(_req.body);
        patientService.addEntry(entry, patientId);
        res.send(entry);
    } catch (err: unknown) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;
