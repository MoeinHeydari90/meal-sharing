// src/MealsPage.jsx
import React, { useEffect, useState } from "react";
import MealsList from "./components/MealsList"; // Import the MealsList component
import styles from "./MealsPage.module.css"; // Optional: Create a CSS module for styling
import { useRouter } from "next/router"; // Import useRouter

const MealsPage = () => {
    const router = useRouter(); // Initialize router
    const { title } = router.query; // Get title from the query params

    return (
        <div className={styles.mealsPage}>
            <MealsList searchTerm={title || ""} /> {/* Use the MealsList component here */}
        </div>
    );
};

export default MealsPage;
