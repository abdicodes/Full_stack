/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express = require('express');
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('full stack development');
});
app.post('/exercises', (_req, res) => {
    console.log(_req.body);
    if (!_req.body.array || !_req.body.target) {
        return res.send({ error: 'parameters missing' }).status(400);
    }
    console.log('it has passed this line ');
    const { array, target } = _req.body;
    if (
        isNaN(
            array.reduce(
                (sum: number, day: number | string) => sum + Number(day),
                0
            )
        ) ||
        isNaN(Number(target))
    ) {
        return res.send({ error: 'malformatted parameters' }).status(400);
    }
    return res.send(calculateExercises(array, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
