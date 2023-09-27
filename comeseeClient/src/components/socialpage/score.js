import React, { useState, useEffect } from 'react';
import IS from '../../css/socialpage/infoPage.module.css';

const Score = ({ score }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const targetScore = parseFloat(score); // Convert score to a number
        const duration = 500; // Animation duration in milliseconds
        const interval = 10; // Interval for updating the score
        const steps = Math.ceil(duration / interval);
        const increment = (targetScore - animatedScore) / steps;

        let step = 0;

        const animationInterval = setInterval(() => {
            if (step < steps) {
                setAnimatedScore((prevScore) => prevScore + increment);
                step++;
            } else {
                setAnimatedScore(targetScore);
                clearInterval(animationInterval);
            }
        }, interval);

        return () => {
            clearInterval(animationInterval); // Cleanup the interval on unmount
        };
    }, [score, animatedScore]);

    return (
        <div className={IS.Score}>
            <div className={`${IS.starscore} col-8 px-0 pb-3`}>{animatedScore.toFixed(1)}</div>
            <div className={`${IS.full} col-4 px-2 pb-4`}>/5</div>
        </div>
    );
};

export default Score;
