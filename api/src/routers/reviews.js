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

// Returns all reviews for a specific meal
reviewsRouter.get("/meals/:meal_id/reviews", async (req, res) => {
    const { meal_id } = req.params;
    try {
        // Query to select all reviews for the specified meal_id
        const reviews = await knex("Review").where({ meal_id });
        if (reviews.length > 0) {
            res.json(reviews);
        } else {
            res.status(404).json({ message: "No reviews found for this meal" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve reviews" });
    }
});

// Adds a new review to the database
reviewsRouter.post("/", async (req, res) => {
    const { id, title, description, meal_id, stars, created_date } = req.body;

    // Validate the stars rating to ensure it is between 1 and 5
    if (stars < 1 || stars > 5) {
        return res.status(400).json({ error: "Stars rating must be between 1 and 5" });
    }

    try {
        // Insert the new review into the Review table
        const [newReviewId] = await knex("Review")
            .insert({
                id,
                title,
                description,
                meal_id,
                stars,
                created_date,
            })
            .returning("id");

        res.status(201).json({ message: "Review added successfully", id: newReviewId });
    } catch (error) {
        res.status(500).json({ error: "Failed to add review" });
    }
});

export default reviewsRouter;
