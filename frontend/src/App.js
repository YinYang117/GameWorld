import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import ProductDetailsPage from "./components/ProductDetailsPage";
import NewProductPage from "./components/NewProductPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Header isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/" >
          <MainPage />
        </Route>
        <Route exact path="/products/new">
          <NewProductPage />
        </Route>
        <Route path="/products/:productId">
          <ProductDetailsPage />
        </Route>
        <Route>
          404 Not Found
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;