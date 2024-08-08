// Import necessary modules and configurations
import "dotenv/config"; // Loads environment variables from a .env file into process.env
import express from "express"; // Import Express for creating the server and handling routing
import cors from "cors"; // Import CORS for enabling cross-origin requests
import bodyParser from "body-parser"; // Middleware to parse incoming request bodies in JSON format
import knex from "./database_client.js"; // Import database client (Knex) for querying the database

// Importing routers for handling different API endpoints
import firstMeal from "./routers/first-meal.js";
import allMeals from "./routers/all-meals.js";
import futureMeals from "./routers/future-meals.js";
import lastMeal from "./routers/last-meal.js";
import pastMeals from "./routers/past-meals.js";

// Create an Express application instance
const app = express();

// Apply middleware to the Express app
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// Create a new router for API endpoints
const apiRouter = express.Router();

// Register routes with the apiRouter
apiRouter.use("/first-meal", firstMeal);
apiRouter.use("/all-meals", allMeals);
apiRouter.use("/future-meals", futureMeals);
apiRouter.use("/last-meal", lastMeal);
apiRouter.use("/past-meals", pastMeals);

// Register the API router under the "/api" path
app.use("/api", apiRouter);

// These routes are also registered outside of the apiRouter, making them accessible directly as well
app.use("/first-meal", firstMeal);
app.use("/all-meals", allMeals);
app.use("/future-meals", futureMeals);
app.use("/last-meal", lastMeal);
app.use("/past-meals", pastMeals);

// A basic route to respond with a welcome message
app.get("/", async (req, res) => {
    res.send("Welcome");
    res.end();
});

// Start the server and listen on the port defined in the environment variables
app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`);
});
