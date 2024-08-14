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

export default reservationsRouter;
