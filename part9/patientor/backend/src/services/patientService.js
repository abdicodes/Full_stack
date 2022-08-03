"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patientEntry) => {
    const newPatient = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v4)() }, patientEntry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getEntries, getNonSensitiveEntries, addPatient };
