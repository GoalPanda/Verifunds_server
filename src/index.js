const express = require("express");
const app = express();
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
app.get("/api/plaid/transactions", getTransactions);

app.post('/api/plaid/getBalance', getBalance);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});