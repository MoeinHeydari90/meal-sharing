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

// GET /api/reservations/:id - Returns a reservation by id
reservationsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await knex("Reservation").where({ ID: id }).first();
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve reservation" });
    }
});

// PUT /api/reservations/:id - Updates the reservation by id
reservationsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { guest_name, meal_id, reservation_date } = req.body;
    try {
        const updatedRows = await knex("Reservation")
            .where({ ID: id })
            .update({ guest_name, meal_id, reservation_date });
        if (updatedRows > 0) {
            res.json({ message: "Reservation updated successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update reservation" });
    }
});

export default reservationsRouter;
