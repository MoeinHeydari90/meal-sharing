import express from "express";
import knex from "../database_client.js"; // Import the configured knex instance

const mealsRouter = express.Router();

// GET /api/meals - Returns all meals
mealsRouter.get("/", async (req, res) => {
    try {
        const meals = await knex.select("*").from("Meal").orderBy("ID", "ASC");
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve meals" });
    }
});

// POST /api/meals - Adds a new meal to the database
mealsRouter.post("/", async (req, res) => {
    const { id, title, description, location, when, max_reservations, price, created_date } =
        req.body;
    try {
        const [newMealId] = await knex("Meal")
            .insert({
                id,
                title,
                description,
                location,
                when,
                max_reservations,
                price,
                created_date,
            })
            .returning("id");
        res.status(201).json({ message: "Meal added successfully", id: newMealId });
    } catch (error) {
        res.status(500).json({ error: "Failed to add meal" });
    }
});

// GET /api/meals/:id - Returns the meal by id
mealsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const meal = await knex("Meal").where({ ID: id }).first();
        if (meal) {
            res.json(meal);
        } else {
            res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve meal" });
    }
});

// PUT /api/meals/:id - Updates the meal by id
mealsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, created_date } = req.body;
    try {
        const updatedRows = await knex("Meal")
            .where({ ID: id })
            .update({ name, description, price, created_date });
        if (updatedRows > 0) {
            res.json({ message: "Meal updated successfully" });
        } else {
            res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update meal" });
    }
});

// DELETE /api/meals/:id - Deletes the meal by id
mealsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await knex("Meal").where({ ID: id }).del();
        if (deletedRows > 0) {
            res.json({ message: "Meal deleted successfully" });
        } else {
            res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete meal" });
    }
});

export default mealsRouter;
