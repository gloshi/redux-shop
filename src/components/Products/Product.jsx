import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../features/user/userSlice";
import styles from "../../styles/Product.module.css";
import { ROUTES } from "../../utils/routes";

const Product = (item) => {
  const SIZES = [4, 4.5, 5];
    const { images, title, price, description, category } = item
    const dispatch = useDispatch()

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentSize, setCurrentSize] = useState(SIZES[0]);

  // console.log(category.name)

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);


  const addToCart = () => {
    dispatch(addItemToCart(item))
  }

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{Math.floor(price * 0.8)} $</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>

          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ""
                }`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            onClick={addToCart}
            className={styles.add}
            disabled={!currentSize}
          >
            Добавить в корзину
          </button>
          <button className={styles.favourite}>Добавить в избранное</button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>
            19 человек купили этот товар сегодня
          </div>

          <Link to={ROUTES.HOME}>Вернуться назад</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
