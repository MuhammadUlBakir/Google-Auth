const mongoose = require('mongoose');
const colors = require('colors');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB).then(() => console.log("Database Connected Successfully".bgGreen.white)).catch(() => console.log("Database Not Connected".bgRed.white));

