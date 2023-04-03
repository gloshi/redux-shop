import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/Category.module.css";
import Products from "../Products/Products";

const Category = () => {
  const { id } = useParams();
  const {list}  = useSelector(({categories}) => categories)
  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    ...defaultValues,
    categoryId: id,
  };
  const [cat,setCat] = useState('')
  const [params, setParams] = useState(defaultParams);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    if (!id) return;
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return;
    const {name} = list.find((item) => item.id === id * 1)
    setCat(name)
  }, [list,id]);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({...params,...values})
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat}</h2>
      <form className={styles.filter} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            value={values.price_min}
            onChange={handleChange}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden />
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !data.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={data}
          style={{ padding: 0 }}
          amount={data.length}
        />
      )}
    </section>
  );
};

export default Category;
