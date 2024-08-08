import express from "express";
import knex from "../database_client.js";

const firstMeal = express.Router();

firstMeal.get("/", async (req, res) => {
    const result = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC LIMIT 1");
    const firstMeal = result[0];
    if (firstMeal.length == 0) {
        res.status(404).send("There is no registered meal");
    } else {
        res.status(200).json(firstMeal);
    }
});

export default firstMeal;
