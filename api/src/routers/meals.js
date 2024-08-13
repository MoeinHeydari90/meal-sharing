import express from "express";
import knex from "../database_client.js"; // Import the configured knex instance

const mealsRouter = express.Router();

// GET /api/meals - Returns all meals
mealsRouter.get("/", async (req, res) => {
    try {
        const meals = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC");
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve meals" });
    }
});

export default mealsRouter;
