"use client"; // Mark as a client component

import React, { useState, useEffect } from "react";
import Meal from "./Meal"; // Import the Meal component
import Link from "next/link"; // Import Link for navigation
import styles from "./MealsList.module.css"; // Optional: Create a CSS module for styling

const MealsList = ({ searchTerm, sortKey, sortDir, setMeals }) => {
    const [meals, setLocalMeals] = useState([]);

    // Fetch meals from API when the component mounts or when searchTerm, sortKey or sortDir changes
    useEffect(() => {
        console.log("MealsList component rendered with props:", { searchTerm, sortKey, sortDir });

        const fetchMeals = async () => {
            const apiUrl = `http://localhost:3001/api/meals?title=${searchTerm}&sortKey=${sortKey}&sortDir=${sortDir}`;
            console.log(`Fetching meals from URL: ${apiUrl}`);
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
                }
                const data = await response.json();

                setLocalMeals(data); // Set the local meals state with fetched data
                setMeals(data); // Update the meals state in the parent component
            } catch (error) {
                console.error("Error fetching meals:", error);
                console.log(
                    `Search Term: ${searchTerm}, Sort Key: ${sortKey}, Sort Direction: ${sortDir}`
                );
            }
        };

        fetchMeals();
    }, [searchTerm, sortKey, sortDir]); // Fetch meals whenever searchTerm, sortKey or sortDir changes

    return (
        <div className={styles.mealsGrid}>
            {meals.length > 0 ? (
                meals.map((meal) => (
                    <Link key={meal.id} href={`/meals/${meal.id}`} passHref>
                        <div>
                            <Meal meal={meal} /> {/* Render the Meal component for each meal */}
                        </div>
                    </Link>
                ))
            ) : (
                <p>No meals available at the moment.</p>
            )}
        </div>
    );
};

export default MealsList;
