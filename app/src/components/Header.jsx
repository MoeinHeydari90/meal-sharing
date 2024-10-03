// src/components/Header.jsx
import React from "react"; // Import React
import styles from "./Header.module.css"; // Import CSS styles
import Link from "next/link"; // Import Link for navigation
import { useRouter } from "next/router"; // Import useRouter for navigation

const Header = () => {
    const router = useRouter(); // Initialize router

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <img src="logo.png" alt="Meal Sharing Logo" className={styles.logoImage} />
                </Link>
            </div>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link
                            href="/meals"
                            className={router.pathname === "/meals" ? styles.activeNavItem : ""}
                        >
                            Meals
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={router.pathname === "/about" ? styles.activeNavItem : ""}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/join-us"
                            className={router.pathname === "/join-us" ? styles.activeNavItem : ""}
                        >
                            Join us
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
