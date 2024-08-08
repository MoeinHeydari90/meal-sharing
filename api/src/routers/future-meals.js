import express from "express";
import knex from "../database_client.js";

const futureMeals = express.Router();

futureMeals.get("/", async (req, res) => {
    const result = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
    const futureMeals = result[0];
    res.send(futureMeals);
    res.end();
});

export default futureMeals;
