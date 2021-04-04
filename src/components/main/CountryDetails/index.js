import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

import classes from "./index.module.css";

import { Context } from "../../../App";
const CountryDetails = (props) => {
  const [borders, setBorders] = useState([]);

  const data = useContext(Context);
  const countriesArray = data[0];
  const countryName = props.match.params.name;
  let country = {};

  for (let i of countriesArray) {
    if (countryName === i.name) {
      country = i;
      break;
    }
  }

  let fetchBorders = useMemo(() => [], []);
  country.borders?.forEach((border, index) => {
    fetchBorders.push(`${border};`);
  });
  fetchBorders = fetchBorders.join().replace(/,/g, "");

  useEffect(() => {
    const getBorders = () => {
      if (fetchBorders) {
        axios
          .get(`https://restcountries.eu/rest/v2/alpha?codes=${fetchBorders}`)
          .then((res) => {
            const borders = res.data;
            setBorders(borders);
          });
      }
    };
    getBorders();
  }, []);

  const allCountryNames = countriesArray.map((country, index) => {
    return country.name;
  });

  if (!allCountryNames.includes(countryName) && allCountryNames.length > 0) {
    return <Redirect to="/not-found" />;
  }

  return (
    <Container fluid>
      <Link to="/">
        <button className={classes.button}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </Link>
      <div className={classes["country-info"]}>
        <div className={classes.image}>
          <img className={classes.flag} src={country.flag} alt="flag"></img>
        </div>
        <div className={classes.info}>
          <h2>{country.name}</h2>
          <div className={classes["country-stats"]}>
            <div className={classes["first-stats"]}>
              <p>
                <span>Native Name:</span> {country.nativeName}
              </p>
              <p>
                <span>Population:</span>{" "}
                {country.population && country.population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {country.region}
              </p>
              <p>
                <span>Sub Region:</span> {country.subregion}
              </p>
              <p>
                <span>Capital:</span> {country.capital}
              </p>
            </div>
            <div className={classes["second-stats"]}>
              <p>
                <span>Top Level Domain:</span>{" "}
                {country.topLevelDomain &&
                  country.topLevelDomain.map((domain, index) => {
                    if (index === 0) {
                      return domain;
                    } else {
                      return ", " + domain;
                    }
                  })}
              </p>
              <p>
                <span>Currencies:</span>{" "}
                {country.currencies &&
                  country.currencies.map((currency, index) => {
                    if (index === 0) {
                      return currency.name;
                    } else {
                      return ", " + currency.name;
                    }
                  })}
              </p>
              <p>
                <span>Languages:</span>{" "}
                {country.languages &&
                  country.languages.map((language, index) => {
                    if (index === 0) {
                      return language.name;
                    } else {
                      return ", " + language.name;
                    }
                  })}
              </p>
            </div>
          </div>
          <p className={classes.borders}>
            <span>Border Countries:</span>{" "}
            {borders && borders.length > 0
              ? borders.map((border, index) => {
                  if (index === 0) {
                    return border.name;
                  } else {
                    return ", " + border.name;
                  }
                })
              : "There are no borders."}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default CountryDetails;
