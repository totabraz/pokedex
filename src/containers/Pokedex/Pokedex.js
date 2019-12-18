import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as pokedexActions from "../../store/actions/pokedexActions";
import * as utils from '../../utils/utils'
import classes from "./Pokedex.module.scss";
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`

const AnimatedDiv = styled.div`animation: 1s ${fadeInAnimation};`

class Pokedex extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: null
        }
    }

    searchTitle = "Name.."

    componentDidMount() {
        this.props.onGetPokemons();
    }

    setPokemonsRow = (pokemon) => {
        let rows = pokemon.filter(pokemon => (pokemon.Number > 0));
        if (this.state.filter) {
            rows = rows.filter(pokemon => pokemon.Name.toLowerCase().includes(this.state.filter.toLowerCase()))
        }
        rows = rows.map(pokemon => {
            const numAttack = (pokemon['Fast Attack(s)'].length + pokemon['Special Attack(s)'].length)
            return (
                <tr key={pokemon.Number}>
                    <td><p>
                        <strong>
                            {pokemon.Name}
                        </strong>
                    </p></td>
                    <td><p>
                        {utils.getGeneration(pokemon.Generation)}
                    </p></td>
                    <td><p>
                        {pokemon.Types.join(', ')}
                    </p></td>
                    <td><p>
                        {numAttack}
                    </p></td>
                    <td>
                        <NavLink
                            className={classes.link}
                            to={{
                                pathname: "/pokemon",
                                search: 'id=' + pokemon.Number,
                            }}
                            alt={"Details about " + pokemon.Name}
                            title={"Details about " + pokemon.Name}>
                                <span className={classes.btnInfo}>Detalhes</span>
                                <span className={classes.btnInfoMobile}>i</span>
                            </NavLink>
                    </td>
                </tr>
            )
        })

        return rows
    }

    searchPokemon = (name) => {
        const localPokemons = this.props.pokemons.filter(pokemon => pokemon.Name.includes(name))
        this.setState({ localPokemons: localPokemons })
    }

    render() {
        let msg = "Pokemons não localizados"
        if (this.props.error)
            console.log(this.props.error)

        if (this.props.pokemons)

            return (
                <AnimatedDiv className={classes.Pokedex}>

                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Geração</th>
                                <th>Tipos</th>
                                <th>Quantidade<br />de ataques</th>
                                <th>
                                    <input alt={this.searchTitle} className={classes.searchInput} placeholder={this.searchTitle} onChange={(event) => { this.setState({ filter: event.target.value }) }} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.setPokemonsRow(this.props.pokemons)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Nome</th>
                                <th>Geração</th>
                                <th>Tipos</th>
                                <th>Quantidade<br />de ataques</th>
                                <th>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </AnimatedDiv>
            )
        else
            return (
                <p>{msg}</p>
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
        onGetPokemons: () => dispatch(pokedexActions.getPokemons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Pokedex, axios))