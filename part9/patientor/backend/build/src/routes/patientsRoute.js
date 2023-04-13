"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
    // res.send('hello');
});
router.get('/:id', (_req, res) => {
    const id = _req.params.id;
    const entry = patientService_1.default.getPatientEntry(id);
    if (entry) {
        res.send(entry);
    }
    else
        res.status(400).send('Patient info are not found!');
});
router.post('/', (_req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const { name, dateOfBirth, gender, occupation, ssn } = _req.body;
        const newPatient = (0, utils_1.default)(_req.body);
        const patient = patientService_1.default.addPatient(newPatient);
        console.log(patient);
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
router.post('/:id/entries', (_req, res) => {
    console.log(_req.body);
    try {
        const patientId = _req.params.id;
        const entry = (0, utils_1.toNewMedicalEntry)(_req.body);
        const result = patientService_1.default.addEntry(entry, patientId);
        res.send(result);
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
