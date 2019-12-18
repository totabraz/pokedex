import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string';
import * as pokedexActions from '../../store/actions/pokedexActions'
import Profile from '../../components/profile/profile'

class Pokeinfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previousEvolutions: null,
            initialPokemon: null,
            nextEvolutions: null,
        }
    }

    componentDidMount() {
        if (!this.props.pokemons) {
            this.props.onGetPokemons()
        }
    }

    setEvolutions = (evolutions, pokemons, label = null) => {
        const evolutionsList = []
        evolutions.forEach(evolution => {
            evolutionsList.push(pokemons.filter(evol =>
                (evol.Number == evolution.Number)
            ))
        })
        return evolutionsList.map(evolution => {
            return <Profile label={label} key={evolution[0].Number} infos={evolution[0]}/>
        })
    }

    setNextEvolutions = (pokemon, pokemons) => {
        if (pokemon['Next evolution(s)']) {
            return this.setEvolutions(pokemon['Next evolution(s)'], pokemons, 'next')
        }
    }
    setPrevEvolutions = (pokemon, pokemons) => {
        if (pokemon['Previous evolution(s)']) {
            return this.setEvolutions(pokemon['Previous evolution(s)'], pokemons, 'prev')
        }
    }

    
    setPokemon = () => {
        let params = queryString.parse(this.props.location.search)
        if (params.id) {
            const pokemon = this.props.pokemons.filter(pokemon => pokemon.Number === params.id)
            return  (pokemon[0])? pokemon[0] : null;
        }
    }

    render() {
        let profile = (<div><p>Erro ao carregar.</p><p>Verifique se foi passado o ID</p><p>Ou se está conectado a internet</p></div>)
        let nextEvolutions = null
        let prevEvolutions = null
        if (this.props.pokemons) {
            const pokemon = this.setPokemon()
            if (pokemon){
                profile =  <Profile infos={pokemon} />
                prevEvolutions = this.setPrevEvolutions(pokemon, this.props.pokemons)
                nextEvolutions = this.setNextEvolutions(pokemon, this.props.pokemons)
            }
        }
        return (
            <div>
                {profile}
                {prevEvolutions}
                {nextEvolutions}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemons: state.pokemons

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetPokemons: () => dispatch(pokedexActions.getPokemons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokeinfo)

