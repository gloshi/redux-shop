import React from "react";
import styles from "../../styles/Home.module.css";
import BG from "../../images/computer.png";

const Poster = () => (
  <section className={styles.home}>
    <div className={styles.title}>Большая распродажа 30%</div>
    <div className={styles.product}>
      <div className={styles.text}>
        <div className={styles.subtitle}>Лучшая распродажа 2023 года</div>
        <h1 className={styles.head}>LENNON r2d2 with NVIDIA 4090 TI</h1>
        <button className={styles.button}>Shop Now</button>
      </div>
      <div className={styles.image}>
        <img src={BG} alt="bg" />
      </div>
    </div>
  </section>
);

export default Poster;
