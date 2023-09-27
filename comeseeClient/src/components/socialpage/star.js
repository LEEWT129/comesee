import React from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import Star from '../../css/socialpage/star.module.css';

function StarRanking({ averageScore }) {
    // 将平均分数四舍五入到最接近的 0.5
    const roundedScore = Math.round(averageScore * 2) / 2;

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;

                // 根据当前评分和平均评分的差值决定显示全星或半星
                if (currentRating <= roundedScore) {
                    return <FaStar key={index} className={Star.starlight} size={25} color="#ffc107" />;
                } else if (currentRating - 0.5 === roundedScore) {
                    return (
                        <span key={index} className={Star.starlight}>
                            <div className={Star.halfStarContainer}>
                                <FaStarHalf size={25} color="#ffc107" />
                                <FaStarHalf size={25} color="#e4e5e9" className={Star.rotate} />
                            </div>
                        </span>
                    );
                } else {
                    return <FaStar key={index} className={Star.starlight} size={25} color="#e4e5e9" />;
                }
            })}
        </div>
    );
}

export default StarRanking;