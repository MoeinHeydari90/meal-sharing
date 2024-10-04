// src/components/Meal.jsx
import React from "react";
import styles from "./Meal.module.css"; // Ensure correct import

const Meal = ({ meal }) => {
    const availableSpots = meal.max_reservations - meal.current_reservations; // Calculate available spots

    return (
        <div className={styles.mealCard}>
            {/* Display the image */}
            {meal.image_url && (
                <img src={meal.image_url} alt={meal.title} className={styles.mealImage} />
            )}
            <h3 className={styles.mealTitle}>{meal.title}</h3>
            <p className={styles.mealDescription}>{meal.description}</p>
            <p className={styles.mealLocation}>
                <strong>Location:</strong> {meal.location}
            </p>
            <p className={styles.mealDate}>
                <strong>Date:</strong> {new Date(meal.when).toLocaleDateString()}
            </p>
            <p className={styles.mealPrice}>
                <strong>Price:</strong> ${parseFloat(meal.price).toFixed(2)}
            </p>
            {/* Show available spots */}
            <p className={styles.availableSpots}>
                <strong>Available Spots:</strong>{" "}
                {availableSpots > 0 ? availableSpots : "Fully Booked"}
            </p>
        </div>
    );
};

export default Meal;
