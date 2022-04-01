import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Header isLoaded={isLoaded} />
      <MainPage />
      <Footer />
    </>
  );
}

export default App;