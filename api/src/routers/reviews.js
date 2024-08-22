import express from "express";
import knex from "../database_client.js"; // Import the configured knex instance

const reviewsRouter = express.Router();

// GET /api/reviews - Returns all reviews
reviewsRouter.get("/", async (req, res) => {
    try {
        // Query to select all reviews, ordered by ID ascending
        const reviews = await knex.select("*").from("Review").orderBy("id", "ASC");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve reviews" });
    }
});

export default reviewsRouter;
