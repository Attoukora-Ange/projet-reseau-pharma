const express = require('express');
const morgan = require('morgan');
const cookie = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
require('./controllers/MongoDB');
const ROUTE = require('./routes/Route');
const { verifieTokenJWT } = require('./controllers/createJwt');
const App = express();
const PORT = process.env.PORT || 5000;
App.use(express.urlencoded({extended: true}));
App.use(express.json());
const option = {
     
  origin: "http://localhost:3000",
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "access_token"],
  credentials: true,
  exposedHeaders: ["access_token"],
}
App.use(
    cors(option)
  );
App.use(morgan('tiny'));
App.use(cookie());

App.use('/jwt', verifieTokenJWT);
App.use('/api', ROUTE);

App.listen(PORT, ()=> console.log(`Server démaré au PORT ${PORT}`))
