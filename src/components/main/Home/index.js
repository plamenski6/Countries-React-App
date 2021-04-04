import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import classes from "./index.module.css";

import { Context } from "../../../App";
import CountryCard from "../CountryCard";

const Home = () => {
  let data = useContext(Context);
  let countriesArray = data[0];
  let theme = data[1];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [region, setRegion] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const regionChange = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    if (region === "africa") {
      countriesArray = countriesArray.filter((country) => {
        return country.region.includes("Africa");
      });
    } else if (region === "america") {
      countriesArray = countriesArray.filter((country) => {
        return country.region.includes("America");
      });
    } else if (region === "asia") {
      countriesArray = countriesArray.filter((country) => {
        return country.region.includes("Asia");
      });
    } else if (region === "europe") {
      countriesArray = countriesArray.filter((country) => {
        return country.region.includes("Europe");
      });
    } else if (region === "oceania") {
      countriesArray = countriesArray.filter((country) => {
        return country.region.includes("Oceania");
      });
    }

    const searchInput = searchTerm.toLowerCase();
    const results = countriesArray.filter((country) =>
      country.name.toLowerCase().includes(searchInput)
    );
    setSearchResults(results);
  }, [searchTerm, setSearchResults, countriesArray, region]);

  return (
    <div className={classes.home}>
      <div className={classes.fields}>
        <div className={classes["input-group"]}>
          <div className={classes["input-group-prepend"]}>
            <span className={classes["input-group-text"]} id="basic-addon1">
              <i className="fas fa-search"></i>
            </span>
          </div>
          {theme === "light" ? (
            <input
              className={classes["search-bar"]}
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleChange}
              ref={(input) => input && input.focus()}
            />
          ) : (
            <input
              className={classes["search-bar-dark"]}
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleChange}
              ref={(input) => input && input.focus()}
            />
          )}
        </div>
        <select className={classes.dropdown} onChange={regionChange}>
          <option value="all">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <Container fluid className={classes.container}>
        {searchResults.length > 0 ? (
          searchResults.map((country, index) => {
            if (index % 4 === 0) {
              return (
                <Row key={index} className={classes.row}>
                  {searchResults?.[index] && (
                    <Col xs={12} md={3} className={classes.col}>
                      <CountryCard data={[searchResults[index], theme]} />
                    </Col>
                  )}
                  {searchResults?.[index + 1] && (
                    <Col xs={12} md={3} className={classes.col}>
                      <CountryCard data={[searchResults[index + 1], theme]} />
                    </Col>
                  )}
                  {searchResults?.[index + 2] && (
                    <Col xs={12} md={3} className={classes.col}>
                      <CountryCard data={[searchResults[index + 2], theme]} />
                    </Col>
                  )}
                  {searchResults?.[index + 3] && (
                    <Col xs={12} md={3} className={classes.col}>
                      <CountryCard data={[searchResults[index + 3], theme]} />
                    </Col>
                  )}
                </Row>
              );
            }
          })
        ) : (
          <div className={classes.noCountries}>
            <p>Cannot find country with this name.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
