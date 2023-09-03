const express = require('express');
const dotenv = require('dotenv').config({ path: "./.env" });
const storage = require('node-persist');
//--------------------------
const app = express();
const port = 8000 || process.env.PORT
storage.init();
//--------------------------
app.use('/api', require("../router/router"));
//--------------------------
app.listen(port, () => console.log(`Connected Server Localhost ${port}`));