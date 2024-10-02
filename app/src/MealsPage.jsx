// src/MealsPage.jsx
import React, { useState } from "react";
import MealsList from "./components/MealsList"; // Import the MealsList component
import styles from "./MealsPage.module.css"; // Optional: Create a CSS module for styling
import { useRouter } from "next/router"; // Import useRouter

const MealsPage = () => {
    const router = useRouter(); // Initialize router
    const { title } = router.query; // Get title from the query params

    const [sortKey, setSortKey] = useState("when"); // Default sort key
    const [sortDir, setSortDir] = useState("ASC"); // Default sort direction

    const handleSortKeyChange = (e) => {
        setSortKey(e.target.value);
    };

    const handleSortDirChange = (e) => {
        setSortDir(e.target.value);
    };

    return (
        <div className={styles.mealsPage}>
            <div className={styles.sortControls}>
                <label htmlFor="sortKey">Sort By:</label>
                <select id="sortKey" value={sortKey} onChange={handleSortKeyChange}>
                    <option value="when">Date</option>
                    <option value="max_reservations">Max Reservations</option>
                    <option value="price">Price</option>
                </select>
                <label htmlFor="sortDir">Order:</label>
                <select id="sortDir" value={sortDir} onChange={handleSortDirChange}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>
            <MealsList searchTerm={title || ""} sortKey={sortKey} sortDir={sortDir} />{" "}
            {/* Use the MealsList component here */}
        </div>
    );
};

export default MealsPage;
