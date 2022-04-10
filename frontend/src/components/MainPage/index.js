import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as productActions from '../../store/products';
import ProductCard from '../ProductCard';
import "./MainPage.css";

function MainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const products = useSelector(state => Object.values(state.products));

  useEffect(() => {
    dispatch(productActions.loadProducts())
  },[dispatch]);

  const newProduct = () => {
    history.push('/products/new')
  }

  return (
    <>
      <div className="main">
        <h1 className="h1" >~~''-- Game World --''~~</h1>
        {sessionUser &&
          <button className="new-product-button" onClick={newProduct}>Create new spot</button>
        }
        <div className="product-list-container">
          {products &&
            products.map(product => 
              <ProductCard key={product.id} product={product} />
            )
          }
        </div>
      </div>
    </>
  );
};

export default MainPage