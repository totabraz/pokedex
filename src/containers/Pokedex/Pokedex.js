import React, { Component } from 'react'
import axios from 'axios';

import * as  pokedexActions from "../../store/actions/pokedexActions";
import { connect } from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Pokedex extends Component { 
    constructor(props){
        super(props)
        this.state ={}
    }

    componentDidMount() {
        this.props.onGetPokemons();
    }

    render() {
        return(
            <div>
                Pokedex
            </div>
        )
    }   
}

const mapStateToProps = state => {
    return {
        pokemons: state.pokemons,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetPokemons:  () => dispatch(pokedexActions.getPokemons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Pokedex, axios))