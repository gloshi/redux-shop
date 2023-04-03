import React from "react";

import styles from "../../styles/Home.module.css";

import bannerImg from "../../images/banner.png";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
            Новый год
            <span>Распродажа</span>
            <button className={styles.more}>Посмотреть все</button>
        </p>
      </div>
      <div className={styles.right} style={{ backgroundImage: `url(${bannerImg})` }} >
      <p className={styles.discount}>
        сохраните до  <span>50%</span> 
      </p>
      </div>
    </section>
  );
};

export default Banner;
