import React from 'react';
import { FaStar } from 'react-icons/fa';
// import Star from '../../css/socialpage/star.module.css';

function StarRate({ score }) {

    const maxStars = 5; // 最大星星数量
    const filledStars = Math.round(score); // 四舍五入到最接近的整数来确定填充的星星数量

    // 生成星星图标的数组
    const starIcons = [];
    for (let i = 0; i < maxStars; i++) {
        if (i < filledStars) {
            starIcons.push(<FaStar key={i} className="star-filled" color='#ffc107' size={25} />); // 填充的星星
        } else {
            starIcons.push(<FaStar key={i} className="star" color='#e4e5e9' size={25} />); // 未填充的星星
        }
    }

    return (
        <div className="star-rating">
            {starIcons}
        </div>
    );
}

export default StarRate;