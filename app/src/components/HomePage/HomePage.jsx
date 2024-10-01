// src/components/HomePage/HomePage.jsx
import React from "react";
import styles from "./HomePage.module.css"; // Import CSS styles

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <video className={styles.video} autoPlay loop muted playsInline>
                    <source
                        src="https://videos.pexels.com/video-files/3209012/3209012-uhd_2560_1440_25fps.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <h1 className={styles.overlayText}>Welcome to Meal Sharing</h1>
            </div>
            <h2 className={styles.subtitle}>Try the best food in Copenhagen</h2>
            <p className={styles.text}>
                Welcome to our Meal-Sharing restaurant, the best Italian restaurant in town.
            </p>
            <p className={styles.text}>
                If you want to taste a piece of Italy, then you’re in the right place.
            </p>
        </div>
    );
};

export default HomePage;
