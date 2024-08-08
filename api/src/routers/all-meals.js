import express from "express";
import knex from "../database_client.js";

const allMeals = express.Router();

allMeals.get("/", async (req, res) => {
    const result = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC");
    const allMeals = result[0];
    res.send(allMeals);
    res.end();
});

export default allMeals;
