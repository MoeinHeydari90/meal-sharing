// src/components/MealsList.jsx
"use client"; // Mark as a client component

import React, { useState, useEffect } from "react";
import Meal from "./Meal"; // Import the Meal component
import Link from "next/link"; // Import Link for navigation
import styles from "./MealsList.module.css"; // Optional: Create a CSS module for styling

const MealsList = ({ searchTerm }) => {
    const [meals, setMeals] = useState([]);

    // Fetch meals from API when the component mounts
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/meals?title=${searchTerm}`); // Adjust this if necessary
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
                }
                const data = await response.json();
                setMeals(data); // Set the meals state with fetched data
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };

        fetchMeals();
    }, [searchTerm]); // Fetch meals whenever the searchTerm changes

    return (
        <div className={styles.mealsGrid}>
            {meals.length > 0 ? (
                meals.map((meal) => (
                    <Link key={meal.id} href={`/meals/${meal.id}`} passHref>
                        {" "}
                        {/* Link to meal detail page */}
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
