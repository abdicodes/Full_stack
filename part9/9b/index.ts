import express = require('express');

const app = express();

app.get('/hello', (_req, res) => {
    res.send('full stack development');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
