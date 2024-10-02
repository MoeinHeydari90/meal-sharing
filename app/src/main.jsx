// src/main.jsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage"; // Import HomePage
import MealsPage from "./MealsPage"; // Import MealsPage
import MealDetailPage from "./MealDetailPage"; // Import MealDetailPage
import Header from "./components/Header"; // Import Header
import Footer from "./components/Footer"; // Import Footer

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/meals" component={MealsPage} />
                <Route path="/meals/:id" component={MealDetailPage} />
                <Route path="/about" component={AboutPage} />
            </Switch>
            <Footer />
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("root")); // Ensure you have a root element in your HTML
