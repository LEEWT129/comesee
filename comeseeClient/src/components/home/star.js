import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Star from '../../css/socialpage/star.module.css';

function StarRanking(props) {
    const [rating, setRating] = useState(null);
    // const [hover, setHover] = useState(null);
    const handleStarClick = (value) => {
        props.onRatingChange(value);
        setRating(value);
    };
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={currentRating} onClick={() => handleStarClick(currentRating)}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                        />
                        <FaStar
                            className={Star.starlight}
                            size={25}
                            color={currentRating <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                );
            })}
            {/* {rating && <p>You rated: {rating} stars</p>} */}
        </div>
    )
}

export default StarRanking;