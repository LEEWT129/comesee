import React from "react";
import SocialStyle from "../../css/personalSocialPage/social.module.css";

const StarContainer = ({ rating }) => {
  return (
    <div className={SocialStyle.star}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="178"
        height="27"
        viewBox="0 0 178 27"
        fill="none"
      >
        <path
          d="M14.454 1.86572L18.6113 9.36618L27.908 10.5763L21.181 16.4113L22.7686 24.6547L14.454 20.7606L6.13943 24.6547L7.727 16.4113L1 10.5763L10.2967 9.36618L14.454 1.86572Z"
          fill={1 <= rating ? "#EFE94C" : "gray"}
          stroke={1 <= rating ? "#EFE94C" : "gray"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M51.3183 2.34521L55.4755 9.84567L64.7722 11.0558L58.0453 16.8908L59.6328 25.1341L51.3183 21.2401L43.0037 25.1341L44.5913 16.8908L37.8643 11.0558L47.161 9.84567L51.3183 2.34521Z"
          fill={2 <= rating ? "#EFE94C" : "gray"}
          stroke={2 <= rating ? "#EFE94C" : "gray"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M88.4501 2.34521L92.6074 9.84567L101.904 11.0558L95.1771 16.8908L96.7647 25.1341L88.4501 21.2401L80.1355 25.1341L81.7231 16.8908L74.9961 11.0558L84.2928 9.84567L88.4501 2.34521Z"
          fill={3 <= rating ? "#EFE94C" : "gray"}
          stroke={3 <= rating ? "#EFE94C" : "gray"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M125.584 2.34521L129.741 9.84567L139.038 11.0558L132.311 16.8908L133.898 25.1341L125.584 21.2401L117.269 25.1341L118.857 16.8908L112.13 11.0558L121.427 9.84567L125.584 2.34521Z"
          fill={4 <= rating ? "#EFE94C" : "gray"}
          stroke={4 <= rating ? "#EFE94C" : "gray"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M162.717 2.34521L166.874 9.84567L176.171 11.0558L169.444 16.8908L171.031 25.1341L162.717 21.2401L154.402 25.1341L155.99 16.8908L149.263 11.0558L158.559 9.84567L162.717 2.34521Z"
          fill={5 <= rating ? "#EFE94C" : "gray"}
          stroke={5 <= rating ? "#EFE94C" : "gray"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default StarContainer;
