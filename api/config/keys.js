const DB_USER = "wbaje";
const DB_PASSWORD = "tfe_test_db";
const MONGODB = {
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ncfur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
};

const SESSION = {
  COOKIE_KEY: "thisappisawesome",
  
};

const KEYS = {
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
