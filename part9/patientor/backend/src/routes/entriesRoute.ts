import express from 'express';

import { Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('hello world');
});
