import express from "express";
import configViewEngine from "./configs/viewEngine.mjs";
import webRoutes from "./routes/webRoutes.mjs";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;

// config body-parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config viewEngine, static files
configViewEngine(app);

// Routes
app.use("/", webRoutes);

// Running info
app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
