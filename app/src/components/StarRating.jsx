// src/components/StarRating.jsx
import React from "react";
import Rating from "@mui/material/Rating";

const StarRating = ({ value, onChange }) => {
    return (
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            precision={1} // Allows half-star ratings
        />
    );
};

export default StarRating;
