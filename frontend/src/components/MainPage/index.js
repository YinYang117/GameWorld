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

  const newSpot = () => {
    history.push('/products/new')
  }

  return (
    <>
      <div className="main">
        <div>Main Page</div>
        <div>Game World</div>
        {sessionUser &&
          <button onClick={newSpot}>Create new spot</button>
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