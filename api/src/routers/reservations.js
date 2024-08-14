// /api/src/routers/reservations.js

import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

// GET /api/reservations - Returns all reservations
reservationsRouter.get("/", async (req, res) => {
    try {
        const reservations = await knex.select("*").from("Reservation").orderBy("ID", "ASC");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve reservations" });
    }
});

// POST /api/reservations - Adds a new reservation to the database
reservationsRouter.post("/", async (req, res) => {
    const { guest_name, meal_id, reservation_date } = req.body;
    try {
        const [id] = await knex("Reservation")
            .insert({ guest_name, meal_id, reservation_date })
            .returning("ID");
        res.status(201).json({ message: "Reservation added successfully", id });
    } catch (error) {
        res.status(500).json({ error: "Failed to add reservation" });
    }
});

export default reservationsRouter;
