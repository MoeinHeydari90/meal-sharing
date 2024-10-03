// src/AboutPage.jsx
import React from "react";
import styles from "./AboutPage.module.css"; // Import CSS module

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h1>About us</h1>
            <p>
                At Meal Sharing, we believe in bringing people together through delicious food and
                memorable experiences. Whether you're a food lover or just looking to share a meal
                with friends, our platform connects you with a variety of culinary delights from
                talented chefs and passionate home cooks.
            </p>
            <p>
                We understand that food is more than just sustenance; it’s a way to connect,
                celebrate, and share cultures. Our mission is to create a vibrant community where
                individuals can gather around a table, share stories, and create lasting memories
                over a delightful meal. From traditional family recipes passed down through
                generations to innovative dishes that push the boundaries of flavor, every meal
                tells a story.
            </p>{" "}
            <p>
                Our platform offers an array of dining options, whether you’re interested in a cozy
                dinner at home, a lively potluck with neighbors, or an exclusive dining experience
                curated by a professional chef. We celebrate the diversity of culinary arts and aim
                to promote local talent, allowing home cooks and chefs to showcase their skills
                while sharing their passion for cooking with others.
            </p>
            <p>
                At Meal Sharing, we are committed to fostering a sense of belonging. We believe that
                every meal is an opportunity to connect with others, learn about different cultures,
                and expand your palate. Join us in our journey to redefine the dining experience and
                explore the rich tapestry of flavors our community has to offer.
            </p>{" "}
            <p>
                We invite you to discover new culinary experiences, meet like-minded food
                enthusiasts, and celebrate the joy of sharing meals. Together, let’s create a world
                where every meal is an adventure and every gathering is a celebration of life.
            </p>
        </div>
    );
};

export default AboutPage;
