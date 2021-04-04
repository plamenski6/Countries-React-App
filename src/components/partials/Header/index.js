import React from 'react';

import classes from './index.module.css';

const Header = ({data}) => {
    const theme = data[0];
    const themeToggler = data[1];

    return (
        <div className={classes.header}>
            <h2>
                Where in the world?
            </h2>
            {theme === "light" ? (
                <p onClick={themeToggler}><i className="far fa-moon"></i> Dark Mode</p>
            ):(
                <p onClick={themeToggler}><i className="fas fa-sun"></i> Light Mode</p>
            )}
        </div>
    )
}

export default Header