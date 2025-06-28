const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('CTT 2025');
});

app.post('/receive', (req, res) => {
    const data = req.body;
    console.log(data)
    // insert data into the database

    res.status(200).send('Data received');
})

app.listen(port, () => {
  console.log(`CTT Web Server listening at http://localhost:${port}`);
});