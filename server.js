const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const DATA_FILE = './player_data.json';

// Initializing data store
let playerDataStore = {};

// Load existing player data from file
if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  playerDataStore = JSON.parse(data);
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server v2 is running');
});

// Save data to server
app.post('/save-data', (req, res) => {
  const data = req.body;
  const userId = Object.keys(data)[0];
  console.log(`User ID: ${userId}`);
  console.log(`User data received: ${JSON.stringify(data)}`);

  // update data store
  playerDataStore[userId] = data[userId];

  // log updated store to the file
  fs.writeFileSync(DATA_FILE, JSON.stringify(playerDataStore, null, 2), 'utf8');
  
  res.status(200).send('Data received');
})

// Get data from server
app.get('/get-data/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`Requesting data for User ID: ${userId}`);

  if (playerDataStore[userId]) {
    res.status(200).json(playerDataStore[userId]);
    // Delete user data after retrieval (save memory)
    delete playerDataStore[userId];
    fs.writeFileSync(DATA_FILE, JSON.stringify(playerDataStore, null, 2), 'utf8');
    console.log(`Data for User ID: ${userId} sent and deleted from store`);
  } else {
    res.status(404).send('User data not found');
  }
});

app.listen(port, () => {
  console.log(`CTT Web Server listening at http://localhost:${port}`);
});