import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Header.module.css";
import { ROUTES } from "../../utils/routes";
import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(({ user }) => user);

  const [value, setValue] = useState({ name: "Guest", avatar: AVATAR });
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;
    setValue(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="logo" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${value.avatar})` }}
          />
          <div className={styles.username}>{value.name}</div>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.icon}>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
          </svg>
        </div>
        <div className={styles.input}>
          <input
            type="search"
            name="search"
            placeholder="Поиск..."
            autoComplete="off"
            onChange={handleSearch}
            value={searchValue}
          />
        </div>
        {searchValue && (
          <div className={styles.box}>
            {isLoading
              ? "загрузка"
              : !data.length
              ? "нет результатов :("
              : data.map(({ title, images, id }) => {
                  return (
                    <Link key={id} onClick={()=> setSearchValue('')} className={styles.item}  to={`/products/${id}`}>
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div className={styles.title}>{title}</div>
                    </Link>
                  );
                })}
          </div>
        )}
      </form>
      <div className={styles.account}>
        <Link to={ROUTES.HOME} className={styles.favourites}>
          <svg className={styles["icon-fav"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
          </svg>
        </Link>
        <Link to={ROUTES.CART} className={styles.cart}>
          <svg className={styles["icon-cart"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          <span className={styles.count}>2</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
