import express from 'express';
const app = express();
import cors from 'cors';
import patientsRouter from './routes/patientsRoute';
import diagnousesRouter from './routes/diagnosesRoute';

app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnousesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
