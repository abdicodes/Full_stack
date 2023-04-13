"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
const getPatientEntry = (id) => {
    return patients_1.default.find((patient) => patient.id === id);
};
const addPatient = (patientEntry) => {
    const newPatient = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v4)() }, patientEntry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (entry, id) => {
    patients_1.default.forEach((patient) => patient.id == id ? patient.entries.push(entry) : null);
    const clone = ((_a) => {
        var { diagnosisCodes } = _a, rest = __rest(_a, ["diagnosisCodes"]);
        return rest;
    })(entry);
    return clone;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatientEntry,
    addEntry,
};
