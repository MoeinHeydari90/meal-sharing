// src/MealsPage.jsx
import React from "react";
import MealsList from "./components/MealsList"; // Import the MealsList component
import styles from "./MealsPage.module.css"; // Optional: Create a CSS module for styling

const MealsPage = () => {
    return (
        <div className={styles.mealsPage}>
            <h1>Meals</h1> {/* Add a title for the page */}
            <MealsList /> {/* Use the MealsList component here */}
        </div>
    );
};

export default MealsPage;
