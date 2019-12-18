import React, { Component } from 'react'
import classes from './Layout.module.scss'
import Aux from '../Aux/Aux'
import MainHeader from "../../components/MainHeader/MainHeader";

class Layout extends Component {
    render() {
        return (
            <Aux>
                <MainHeader />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layout