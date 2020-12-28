const plaid = require("plaid");
const moment = require("moment");

const PLAID_CLIENT_ID = "5df53172107d16001250eee5";
const PLAID_SECRET = "3c97be73bc78f45b6b216d349c16cd";
const PLAID_PUBLIC_KEY = "6ffeee23620fb61e568e37fd2948cb";
const PLAID_ENV = "sandbox";

let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

// Initialize the Plaid client
const client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments.sandbox,
});

const receivePublicToken = async (req, res) => {
  let PUBLIC_TOKEN = req.body.public_token;
  // Second, exchange the public token for an access token
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    res.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID
    });
    console.log("access token below");
    console.log(ACCESS_TOKEN);
  });
};

const getTransactions = async (req, res) => {
  let startDate = moment()
    .subtract(90, "days")
    .format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  console.log("made it past variables");
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function (error, transactionsResponse) {
      res.json({ transactions: transactionsResponse });
      // TRANSACTIONS LOGGED BELOW! 
      // They will show up in the terminal that you are running nodemon in.
      // console.log(transactionsResponse);
    }
  );
};

const getBalance = async (req, res) => {
  client.getBalance(
    ACCESS_TOKEN,
    function (error, res) {
      console.log(res)
      // res.json({ res: transactionsResponse });
      // TRANSACTIONS LOGGED BELOW! 
      // They will show up in the terminal that you are running nodemon in.
      // console.log(transactionsResponse);
    }
  );
};


module.exports = {
  receivePublicToken,
  getTransactions,
  getBalance,
};
