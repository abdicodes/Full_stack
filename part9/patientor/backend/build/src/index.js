"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const patientsRoute_1 = __importDefault(require("./routes/patientsRoute"));
const diagnosesRoute_1 = __importDefault(require("./routes/diagnosesRoute"));
app.use(express_1.default.json());
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins,
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)(options));
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/patients', patientsRoute_1.default);
app.use('/api/diagnoses', diagnosesRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
