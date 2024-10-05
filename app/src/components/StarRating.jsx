// src/components/StarRating.jsx
import React from "react";
import Rating from "@mui/material/Rating";

const StarRating = ({ value, onChange, readOnly = false }) => {
    return (
        <Rating
            name="simple-controlled"
            value={value}
            onChange={onChange ? (event, newValue) => onChange(newValue) : null}
            precision={1}
            readOnly={readOnly} // Make the stars read-only if readOnly is passed as true
        />
    );
};

export default StarRating;
