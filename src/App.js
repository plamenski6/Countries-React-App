import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Header from "../src/components/partials/Header";
import Home from "../src/components/main/Home";
import CountryDetails from "../src/components/main/CountryDetails";
import PageNotFound from "../src/components/PageNotFound";

export const Context = React.createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        const countries = res.data;
        setData(countries);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Context.Provider value={[data, theme, isLoading]}>
        <Router>
          <Header data={[theme, themeToggler]} />
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:name" component={CountryDetails} />
              <Route path="/not-found" component={PageNotFound} />
            </Switch>
          )}
        </Router>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
