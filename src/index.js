const express = require("express");
const app = express();
const path = require('path');
const PORT = 5000;
const {
  receivePublicToken,
  getTransactions,
  getBalance
} = require("./controllers/controller");
app.use(express.json());

// Get the public token and exchange it for an access token
app.post("/api/plaid/auth/public_token", receivePublicToken);

// Get Transactions
app.post("/api/plaid/transactions", getTransactions);

app.post('/api/plaid/getBalance', getBalance);

app.use(express.static(path.join(__dirname, 'public')));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});