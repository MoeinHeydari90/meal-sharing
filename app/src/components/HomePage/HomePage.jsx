// src/components/HomePage/HomePage.jsx
import React from "react";
import styles from "./HomePage.module.css"; // Import CSS styles

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <video className={styles.video} autoPlay loop muted playsInline>
                    <source
                        src="https://videos.pexels.com/video-files/3015488/3015488-hd_1920_1080_24fps.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <h1 className={styles.overlayText}>Welcome to Meal Sharing</h1>
                <div className={styles.overlayText}>
                    <h2 className={styles.subtitle}>Try the best food with us</h2>

                    <p className={styles.text}>
                        If you want to taste the cooking of one of your fellow citizens, then you’re
                        in the right place.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
