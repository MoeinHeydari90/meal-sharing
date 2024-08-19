import "dotenv/config"; // Loads environment variables from a .env file into process.env
import express from "express"; // Imports the express framework
import cors from "cors"; // Imports the CORS middleware to enable Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Imports the body-parser middleware to parse incoming request bodies
import knex from "./database_client.js"; // Imports the configured knex instance for database queries
import nestedRouter from "./routers/nested.js"; // Imports a nested router module
import mealsRouter from "./routers/meals.js"; // Import the meals router
import reservationsRouter from "./routers/reservations.js"; // Import the reservations router

const app = express(); // Creates an instance of an express application

// Middleware setup
app.use(cors()); // Enables CORS for all routes
app.use(bodyParser.json()); // Parses incoming JSON request bodies

const apiRouter = express.Router(); // Creates a new router instance for API routes

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter); // Mounts the nested router under the '/nested' path
apiRouter.use("/meals", mealsRouter); // Mount meals router under /api/meals
apiRouter.use("/reservations", reservationsRouter); // Mount reservations router under /api/reservations

app.use("/api", apiRouter); // Mounts the API router under the '/api' path

// Route to get future meals
app.get("/future-meals", async (req, res) => {
    // Query to select meals created in the future, ordered by creation date descending
    const futureMeals = await knex.raw(
        "SELECT * FROM Meal WHERE created_date >= NOW() ORDER BY created_date DESC"
    );
    if (futureMeals.length > 0) {
        res.send(futureMeals); // Sends the list of future meals if any are found
    } else {
        res.send([]); // Sends an empty array if no future meals are found
    }
});

// Route to get past meals
app.get("/past-meals", async (req, res) => {
    // Query to select meals created in the past, ordered by creation date descending
    const pastMeals = await knex.raw(
        "SELECT * FROM Meal WHERE created_date <= NOW() ORDER BY created_date DESC"
    );
    if (pastMeals.length > 0) {
        res.send(pastMeals); // Sends the list of past meals if any are found
    } else {
        res.send([]); // Sends an empty array if no past meals are found
    }
});

// Route to get all meals
app.get("/all-meals", async (req, res) => {
    // Query to select all meals, ordered by ID ascending
    const allMeals = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC");

    if (allMeals.length > 0) {
        res.send(allMeals); // Sends the list of all meals if any are found
    } else {
        res.send([]); // Sends an empty array if no meals are found
    }
});

// Route to get the first meal
app.get("/first-meal", async (req, res) => {
    // Query to select the first meal ordered by ID ascending
    const firstMeal = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC LIMIT 1");
    if (firstMeal.length > 0) {
        // Checking length to ensure there's at least one meal
        res.send(firstMeal); // Sends the first meal if found
    } else {
        res.status(404).send("No meals found"); // Sends a 404 status if no meals are found
    }
});

// Route to get the last meal
app.get("/last-meal", async (req, res) => {
    // Query to select the last meal ordered by ID descending
    const lastMeal = await knex.raw("SELECT * FROM Meal ORDER BY ID DESC LIMIT 1");
    if (lastMeal.length > 0) {
        // Checking length to ensure there's at least one meal
        res.send(lastMeal); // Sends the last meal if found
    } else {
        res.status(404).send("No meals found"); // Sends a 404 status if no meals are found
    }
});

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`); // Logs the port number to the console
});
