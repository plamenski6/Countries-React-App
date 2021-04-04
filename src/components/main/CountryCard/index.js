import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import classes from "./index.module.css";

const CountryCard = ({ data }) => {
  const country = data[0];
  const theme = data[1];

  return (
    <Link to={`${country.name}`} className={classes.link}>
      <Card className={classes.card}>
        <Card.Img className={classes.image} variant="top" src={country.flag} />
        {theme === "light" ? (
          <Card.Body>
            <Card.Title className={classes.title}>{country.name}</Card.Title>
            <Card.Text className={classes["card-text"]}>
              <span className={classes.details}>Population:</span>{" "}
              {country.population && country.population.toLocaleString()}
            </Card.Text>
            <Card.Text className={classes["card-text"]}>
              <span className={classes.details}>Region:</span> {country.region}
            </Card.Text>
            <Card.Text className={classes["card-text"]}>
              <span className={classes.details}>Capital:</span>{" "}
              {country.capital}
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title className={classes["title-dark"]}>
              {country.name}
            </Card.Title>
            <Card.Text className={classes["card-text-dark"]}>
              <span className={classes.details}>Population:</span>{" "}
              {country.population && country.population.toLocaleString()}
            </Card.Text>
            <Card.Text className={classes["card-text-dark"]}>
              <span className={classes.details}>Region:</span> {country.region}
            </Card.Text>
            <Card.Text className={classes["card-text-dark"]}>
              <span className={classes.details}>Capital:</span>{" "}
              {country.capital}
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </Link>
  );
};

export default CountryCard;
