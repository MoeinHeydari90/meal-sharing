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

// POST /api/meals - Adds a new meal to the database
mealsRouter.post("/", async (req, res) => {
    const { name, description, price, created_date } = req.body;
    try {
        await knex("Meal").insert({ name, description, price, created_date });
        res.status(201).json({ message: "Meal added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add meal" });
    }
});

export default mealsRouter;
