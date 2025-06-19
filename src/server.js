const express = require("express");
const { configViewEngine } = require("./config/viewEngine.js");
const { configCORS } = require("./config/cors.js");
const { router } = require("./routes/webRoutes.js");
const { apiRouter } = require("./routes/apiRoutes.js");
const { connection } = require("./config/connectDB.js");
const { createJWT, verifyJWT } = require("./middleware/JWTAction.js");
const { config } = require("dotenv");
config();

const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;

// config CORS
configCORS(app);

// config body-parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config viewEngine, static files
configViewEngine(app);

// Connection DB
connection();

// Routes
app.use("/", router);
app.use("/api", apiRouter);

// Running info
app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
