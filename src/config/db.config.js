require("dotenv").config();
const mysql = require("mysql");
const LogErrorMessage = require("./../utils/error-handler.js");

// Create Database connection
const getConnection = async () => {
    try {
        const dbConnection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        return dbConnection;
    } catch (error) {
        console.log(LogErrorMessage(error));
    }
};

module.exports = getConnection;
