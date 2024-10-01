import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./MealDetailPage.module.css"; // Import CSS module

const MealDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [meal, setMeal] = useState(null);
    const [phoneno, setPhoneno] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDescription, setReviewDescription] = useState("");
    const [stars, setStars] = useState(1); // Default to 1 star
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            const fetchMeal = async () => {
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
            };

            fetchMeal();
        }
    }, [id]);

    const handleReservation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneno,
                    name,
                    email,
                    meal_id: id, // Include meal ID
                }),
            });

            if (response.ok) {
                setMessage("Reservation successful!");
                setPhoneno("");
                setName("");
                setEmail("");
            } else {
                throw new Error("Failed to make a reservation");
            }
        } catch (error) {
            setMessage(error.message);
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
                setMessage("Review added successfully!");
                setReviewTitle("");
                setReviewDescription("");
                setStars(1); // Reset to default
            } else {
                throw new Error("Failed to add review");
            }
        } catch (error) {
            setMessage(error.message);
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
                            placeholder="Phone Number"
                            value={phoneno}
                            onChange={(e) => setPhoneno(e.target.value)}
                            required
                        />
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
                        <button type="submit" className={styles.button}>
                            Book Seat
                        </button>
                    </form>
                )}

                {/* Review Form */}
                <h2>Leave a Review</h2>
                <form onSubmit={handleReview}>
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
                    <label>Rating:</label>
                    <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                    <button type="submit" className={styles.button}>
                        Submit Review
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default MealDetailPage;
