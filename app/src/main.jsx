import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import MealsPage from "./components/MealsPage/MealsPage";
import MealDetailPage from "./components/MealDetailPage/MealDetailPage";
import AboutPage from "./components/AboutPage/AboutPage";
import JoinUsPage from "./components/JoinUsPage/JoinUsPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/meals" component={MealsPage} />
                <Route path="/meals/:id" component={MealDetailPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/join-us" component={JoinUsPage} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
