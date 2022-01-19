import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import { cartActions } from '../../../store/cart';

import FavoriteIcon from "../../UI/FavoriteIcon/FavoriteIcon";

import styles from "./ProductDetail.module.css";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const isFav = useSelector(state => state.auth.authData.favoriteList.includes(product.id));
  const [bump, setBump] = useState(false);

  const discount = product.discount;
  let price = product.price;
  const sales = `${Math.round((1 - discount) * 100)}% OFF NOW!`;
  if (discount !== null) {
    price = Math.round(price * discount);
  }

  const toggleFavHandler = () => {
      dispatch(authActions.toggleFavorite(product.id));
  };

  const addItemHandler = () => {
    dispatch(cartActions.addItem({
      id: product.id,
      price: product.price,
      amount: 1
    }));
    setBump(true);
    setTimeout(() => {
      dispatch(cartActions.toggleCart());
    }, 300);
  };

  useEffect(() => {
    dispatch(authActions.addBrowsingHistory(product.id));
  }, [dispatch, product.id]);

  useEffect(() => {
    if (!bump) {
      return;
    }
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => { clearTimeout(timer); };
  }, [bump]);

  return (
    <>
      <Link to="/categories" className={styles.path}>
        CATEGORIES {">"}
      </Link>
      <Link to={`/categories?cate=${product.category}`} className={styles.path}>
        {`${product.category.toUpperCase()} >`}
      </Link>
      <section className={styles.card}>
        <img src={product.imageUrl} alt={product.title} />
        <h2>{product.title}</h2>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.flex}>
          <div className={styles.priceBox}>
            {discount && (
              <p className={styles.originalPrice}>NT$ {product.price}</p>
            )}
            <p className={`${styles.price} ${discount ? styles.onSale : null}`}>
              NT$ {price}
            </p>
            {discount && <span>{sales}</span>}
          </div>
          <div className={styles.actions}>
            <div className={styles.favorite} onClick={toggleFavHandler}>
              <FavoriteIcon isFav={isFav} />
            </div>
            <button
              className={bump ? styles.bump : null}
              onClick={addItemHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
