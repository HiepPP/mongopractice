var express = require("express");
var mongooes = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

var router = require("./routes");

var app = express();
mongooes.connect("mongodb://127.0.0.1:27017/test");
app.set("port", process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use(router);
app.listen(app.get("port"), () => {
  console.log("server start" + app.get("port"));
});
