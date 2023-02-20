const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const bodyParser = require("body-parser");
const promisify = require("es6-promisify");

const ApiRoute = require("./routes");
const errorHandlers = require("./handlers/errorHandlers");
const fileupload = require("express-fileupload");

require("dotenv").config({ path: ".variables.env" });

// create our Express app
const app = express();

app.use(fileupload());
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "public")));
app.use('/downloads', express.static(path.join(__dirname, "public/downloads")));

// Takes the raw requests and turns them into usable properties on req.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// Sessions allow us to Contact data on visitors from request to request
// This keeps admins logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.admin = req.admin || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Here our API Routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,PUT,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization,x-auth-token, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use("/myserver/api", ApiRoute);

// If that above routes didnt work, we 404 them and forward to error handler
// app.use(errorHandlers.notFound);

// // Otherwise this was a really bad error we didn't expect! Shoot eh
// if (app.get("env") === "development") {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

// // production error handler
// app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
