require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes.js");
const LogErrorMessage = require("./utils/error-handler.js");

const app = express();
const Port = process.env.Port || 8000;

const listenPort = (Port) => {
    app.listen(Port, () => console.log(`Server is up & running on http://localhost:${Port}`));
};

const useMorgan = () => {
    app.use(morgan("short"));
};

const useBodyParser = () => {
    app.use(bodyparser.urlencoded({ extended: false }));
};

const useCors = () => {
    const whitelist = ["http://localhost:4200"];
    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            console.log(origin);
            if (!origin || whitelist.includes(origin)) return callback(null, true);
            callback(new Error("Not allowed by CORS"));
        },
    };
    app.use(cors(corsOptions));
};

const createRoutes = () => {
    routes(app);
};

const start = async () => {
    try {
        listenPort(Number(Port));
        useMorgan();
        useCors();
        useBodyParser();
        createRoutes();
    } catch (error) {
        console.log(LogErrorMessage(error));
    }
};

module.exports = { start };
