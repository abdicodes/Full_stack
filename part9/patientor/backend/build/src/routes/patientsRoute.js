"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
    // res.send('hello');
});
router.post('/', (_req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const { name, dateOfBirth, gender, occupation, ssn } = _req.body;
        const newPatient = (0, utils_1.default)(_req.body);
        const patient = patientService_1.default.addPatient(newPatient);
        res.send(patient);
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
