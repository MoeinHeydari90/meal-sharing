// src/components/Header.jsx
import React from "react";
import styles from "./Header.module.css"; // Import CSS styles
import Link from "next/link"; // Import Link for navigation

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Meal Sharing</div>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/meals">Meals</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/join-us">Join us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
