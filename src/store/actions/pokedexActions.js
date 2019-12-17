import * as  actionsType from './actionsType'
import axios from 'axios'

export const setPokemonActive = (idPokemon) => {
    return {
        type: actionsType.SET_ACTIVE_POKEMON,
        idPokemon: idPokemon
    }
}

export const setPokemons = (pokemons) => {
    return {
        type: actionsType.GET_POKEMONS,
        pokemons: pokemons
    }
}

export const fetchPokemonsError = (error) => {
    return {
        type: actionsType.FETCH_POKEMONS_ERROR,
        error: error,
    }
}

export const getPokemons = () => {
    return dispatch => {
        axios.get('https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json')
            .then(response => {
                dispatch(setPokemons(response.data))
            }) 
            .catch(error => {
                dispatch(fetchPokemonsError(error.data))
            })
    }
}