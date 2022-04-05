import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../store/products'
import "./MainPage.css"

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch()
  },[dispatch])

  return (
    <div className="main">
      <div>Main Page</div>
      <div>Game World</div>
      <div className="product-list-container">

      </div>
    </div>
  )
}

export default MainPage