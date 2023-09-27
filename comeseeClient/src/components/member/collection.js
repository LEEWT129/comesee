import React from "react";
import collection from "../../css/member/collection.module.css";
import SocialStyle from '../../css/socialpage/social.module.css';

const Collection = () => {
  return (
    <div className={collection.filmcollection}>
      <div className={collection.filmcard1}></div>
      <div className={collection.filmcard2}></div>
      <div className={collection.filmcard3}></div>
      <div className={SocialStyle.moviesave}>
        <p className={SocialStyle.movielist}>動作爽片</p>
        <p className={SocialStyle.subsave}>20部電影</p>
      </div>
    </div>
  );
};

export default Collection;
