// src/components/Meal.jsx
import React from "react";
import styles from "./Meal.module.css"; // Ensure correct import
import { formatDate } from "../utils"; // Import the formatDate function
import StarRating from "./StarRating";

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
                <strong>Date:</strong> {formatDate(meal.when)} {/* Use the formatDate function */}
            </p>
            <p className={styles.mealPrice}>
                <strong>Price:</strong> DKK {parseFloat(meal.price).toFixed(2)}
            </p>
            {/* Show available spots */}
            <p className={styles.availableSpots}>
                <strong>Available Spots:</strong>{" "}
                {availableSpots > 0 ? availableSpots : "Fully Booked"}
            </p>
            {/* Display average rating as read-only */}
            <p className={styles.averageRating}>
                {meal.averageRating ? (
                    <StarRating value={meal.averageRating} readOnly />
                ) : (
                    "Not Rated"
                )}
            </p>
        </div>
    );
};

export default Meal;
