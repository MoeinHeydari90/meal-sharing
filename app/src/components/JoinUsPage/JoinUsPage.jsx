// src/JoinUsPage.jsx
import React, { useState } from "react";
import styles from "./JoinUsPage.module.css";
import Button from "../Button";

const JoinUsPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // State to hold success/error message

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Subscription successful!");
            } else {
                setMessage(data.message || "Failed to subscribe");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.subscriptionBox}>
                <h2>Join our meal sharing website to see the most recent meals</h2>
                <p>You can unsubscribe at any time.</p>
                <form className={styles.subscriptionForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className={styles.emailInput}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" variant="primary">
                        Subscribe
                    </Button>
                </form>
                {message && <p className={styles.message}>{message}</p>}{" "}
                {/* Display success/error message */}
            </div>
        </div>
    );
};

export default JoinUsPage;
