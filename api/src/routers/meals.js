import express from "express";
import knex from "../database_client.js"; // Import the configured knex instance

const mealsRouter = express.Router();

// GET /api/meals - Returns all meals, with optional filtering
mealsRouter.get("/", async (req, res) => {
    try {
        // Start building the query
        let query = knex.select("*").from("Meal");

        // Extract query parameters
        const {
            maxPrice,
            availableReservations,
            title,
            dateAfter,
            dateBefore,
            limit,
            sortKey,
            sortDir,
        } = req.query;

        if (maxPrice) {
            query = query.where("price", "<=", parseFloat(maxPrice));
        }

        if (availableReservations !== undefined) {
            const available = availableReservations === "true";
            query = query
                .leftJoin("Reservation", "Meal.id", "=", "Reservation.meal_id")
                .groupBy("Meal.id")
                .havingRaw(
                    available
                        ? "Meal.max_reservations > COUNT(Reservation.id)"
                        : "Meal.max_reservations <= COUNT(Reservation.id)"
                );
        }

        if (title) {
            query = query.where("title", "like", `%${title}%`);
        }

        if (dateAfter) {
            query = query.where("when", ">", dateAfter);
        }

        if (dateBefore) {
            query = query.where("when", "<", dateBefore);
        }

        if (limit) {
            const parsedLimit = parseInt(limit);
            if (parsedLimit > 0) {
                query = query.limit(parsedLimit);
            } else {
                return res.status(400).json({
                    error: "Invalid value for 'limit', It must be a positive integer.",
                });
            }
        }

        // Sorting logic
        if (sortKey) {
            const validSortKeys = ["when", "max_reservations", "price"];
            const validSortDirs = ["ASC", "DESC"];
            const FormattedSortDir =
                sortDir && validSortDirs.includes(sortDir.toUpperCase())
                    ? sortDir.toUpperCase()
                    : "ASC";

            if (validSortKeys.includes(sortKey)) {
                query = query.orderBy(sortKey, FormattedSortDir);
            } else {
                return res.status(400).json({
                    error: "Invalid value for sortKey.",
                });
            }
        }

        // Execute the query
        const meals = await query;

        // Respond with the filtered meals
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve meals" });
    }
});

// POST /api/meals - Adds a new meal to the database
mealsRouter.post("/", async (req, res) => {
    const {
        id,
        title,
        description,
        location,
        when,
        max_reservations,
        price,
        created_date,
        image_url,
    } = req.body;
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
                image_url,
            })
            .returning("id");
        res.status(201).json({ message: "Meal added successfully", id: newMealId });
    } catch (error) {
        res.status(500).json({ error: "Failed to add meal" });
    }
});

// GET /api/meals/:id - Returns the meal by id with current reservation count
mealsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the meal details along with the count of current reservations
        const meal = await knex("Meal")
            .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
            .select("Meal.*")
            .where("Meal.id", id)
            .groupBy("Meal.id") // Group by meal ID to avoid duplicates
            .first(); // Get the first result

        if (meal) {
            // Calculate available reservations
            meal.available_reservations = meal.max_reservations - meal.current_reservations;
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
    const { title, description, location, when, max_reservations, price, created_date } = req.body;
    try {
        const updatedRows = await knex("Meal")
            .where({ id })
            .update({ title, description, location, when, max_reservations, price, created_date });
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
        const deletedRows = await knex("Meal").where({ id }).del();
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
