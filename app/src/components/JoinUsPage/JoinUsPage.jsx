// src/JoinUsPage.jsx
import React from "react";
import styles from "./JoinUsPage.module.css"; // Import CSS module
import Button from "../Button"; // Import the Button component

const JoinUsPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.subscriptionBox}>
                <h2>Join my meal sharing website to see the most recent meals</h2>
                <p>You can unsubscribe at any time.</p>
                <form className={styles.subscriptionForm}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className={styles.emailInput}
                        required
                    />

                    <Button type="submit" variant="primary">
                        Subscribe
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default JoinUsPage;
