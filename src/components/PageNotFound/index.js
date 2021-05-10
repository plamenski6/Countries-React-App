import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import classes from "./index.module.css";

const PageNotFound = () => {
    return (
        <Container fluid>
            <Link to="/">
                <button className={classes.button}>
                    <i className="fas fa-arrow-left"></i> Back
                </button>
            </Link>
            <div className={classes.pageNotFound}>
                <h1>PAGE NOT FOUND!</h1>
            </div>
        </Container>
    )
}

export default PageNotFound