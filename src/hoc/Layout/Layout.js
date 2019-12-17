import React, { Component } from 'react'
import classes from './Layout.module.scss'
import Aux from '../Aux/Aux'
class Layout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Aux>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layout