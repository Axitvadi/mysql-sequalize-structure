require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./router/index");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret:process.env.SECRECT_KEY,
  saveUninitialized:false,
    resave: false, 
    cookie: { 
        maxAge: oneDay,
        httpOnly: true,
        secure: false,
    }
}));


app.use("/", router);

(async function () {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      await sequelize.sync({ force: false })
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  })()

app.listen(8000,()=>{
    console.log("server is runing on PORT:" +8000);
});