import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./MealDetailPage.module.css"; // Import CSS module
import Button from "../Button"; // Import the Button component
import StarRating from "../StarRating"; // Import StarRating component

const MealDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [meal, setMeal] = useState(null);
    const [phoneno, setPhoneno] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1); // New state for number of guests
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDescription, setReviewDescription] = useState("");
    const [stars, setStars] = useState(1); // Default to 1 star
    const [reviews, setReviews] = useState([]); // State to store reviews

    useEffect(() => {
        const fetchMeal = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:3001/api/meals/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setMeal(data);
                } catch (error) {
                    console.error("Error fetching meal:", error);
                }
            }
        };

        const fetchReviews = async () => {
            if (id) {
                try {
                    const response = await fetch(
                        `http://localhost:3001/api/reviews/meals/${id}/reviews`
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setReviews(data);
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            }
        };

        fetchMeal();
        fetchReviews();
    }, [id]);

    // Function to format a date string into the 'dd/mm/yy' format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    const handleReservation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    number_of_guests: numberOfGuests, // Include number of guests
                    meal_id: id, // Include meal ID
                    created_date: new Date().toISOString().split("T")[0], // Add created_date
                    contact_phonenumber: phoneno, // Phone number
                    contact_name: name, // Name
                    contact_email: email, // Email
                }),
            });

            if (response.ok) {
                alert("Reservation successful! We look forward to seeing you.");
                setPhoneno("");
                setName("");
                setEmail("");
                setNumberOfGuests(1); // Reset the guests number after reservation
            } else {
                const errorData = await response.json(); // Try to get the error message from the response
                throw new Error(
                    errorData.message || "Failed to make a reservation. Please try again."
                );
            }
        } catch (error) {
            alert(error.message); // Show an error alert
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: reviewTitle,
                    description: reviewDescription,
                    meal_id: id, // Include meal ID
                    stars,
                    created_date: new Date().toISOString().split("T")[0], // Format date
                }),
            });

            if (response.ok) {
                alert("Review added successfully!");
                setReviewTitle("");
                setReviewDescription("");
                setStars(1); // Reset to default

                // Fetch the reviews again to show the newly added review
                const updatedReviewsResponse = await fetch(
                    `http://localhost:3001/api/reviews/meals/${id}/reviews`
                );
                const updatedReviews = await updatedReviewsResponse.json();
                setReviews(updatedReviews);
            } else {
                throw new Error("Failed to add review");
            }
        } catch (error) {
            alert(error.message); // Show an error alert
        }
    };

    if (!meal) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{meal.title}</h1>
            <img src={meal.image_url} alt={meal.title} className={styles.image} />
            <div className={styles.details}>
                <p>{meal.description}</p>
                <p>Location: {meal.location}</p>
                <p>Date: {new Date(meal.when).toLocaleDateString()}</p>
                <p>Price: ${parseFloat(meal.price).toFixed(2)}</p>
                <p>Available Reservations: {meal.max_reservations - meal.current_reservations}</p>

                {/* Reservation Form */}
                {meal.max_reservations > meal.current_reservations && (
                    <form onSubmit={handleReservation}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={phoneno}
                            onChange={(e) => setPhoneno(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            min="1"
                            placeholder="Number of Guests"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                            required
                        />
                        <Button type="submit">Book Seat</Button>
                    </form>
                )}

                {/* Reviews Section */}
                <div className={styles.reviewsSection}>
                    <h2>Reviews</h2>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <p className={styles.reviewsDate}>
                                        {formatDate(review.created_date)}
                                    </p>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.starDisplay}>
                                            <StarRating value={review.stars} readOnly />
                                        </div>
                                        <strong>{review.title}</strong>
                                    </div>
                                    <p>{review.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews for this meal yet.</p>
                    )}
                </div>

                {/* Review Form */}
                <h2>Leave a Review</h2>
                <form onSubmit={handleReview}>
                    <label>Rating:</label>
                    <div className={styles.ratingContainer}>
                        <StarRating value={stars} onChange={setStars} />
                    </div>
                    <input
                        type="text"
                        placeholder="Review Title"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Review Description"
                        value={reviewDescription}
                        onChange={(e) => setReviewDescription(e.target.value)}
                        required
                    />

                    <Button type="submit">Submit Review</Button>
                </form>
            </div>
        </div>
    );
};

export default MealDetailPage;
