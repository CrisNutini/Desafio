const express = require('express');
const app = express();
const roteador = require('./roteador');

app.use(express.json());
app.use(roteador)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});