// src/components/Header.jsx
import React, { useState } from "react"; // Import useState
import styles from "./Header.module.css"; // Import CSS styles
import Link from "next/link"; // Import Link for navigation
import { useRouter } from "next/router"; // Import useRouter for navigation

const Header = () => {
    const [searchTerm, setSearchTerm] = useState(""); // State for the search input
    const router = useRouter(); // Initialize router

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to the meals page with the search query
        router.push(`/meals?title=${searchTerm}`);
    };

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
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search meals..."
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    Search
                </button>
            </form>
        </header>
    );
};

export default Header;
