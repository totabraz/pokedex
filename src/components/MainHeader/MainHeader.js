import React from 'react'
import classes from './MainHeader.module.scss'
import { NavLink } from 'react-router-dom'


const MainHeader = (props) => {
    return (
        <header className={classes.MainHeader}>
            <NavLink
                to='/'
                exact
                activeClassName={classes.linkhome}
                alt="Go to Pokedex home"
                title="Pokedex home"
            >
                <h1 className={classes.mainTitle}>Pokedex</h1>
            </NavLink>
        </header>
    )
}

export default MainHeader