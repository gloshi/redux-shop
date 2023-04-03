import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";
import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {list,related} = useSelector(({products})=> products )

  const { data, isLoading, isSuccess, isFetching } = useGetProductQuery({ id });
  //можно сделать скелетон isдщф встроен
  console.log(data);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate("/");
    }
  }, [isLoading, isSuccess, isFetching]);

  useEffect(() => {
    if(!data || !list.length) return

      dispatch(getRelatedProducts(data.category.id));

  }, [data, dispatch, list]);

  return !data ? (
    <section>Идет загрузка....</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Похожие товары" />
    </>
  );
};

export default SingleProduct;
