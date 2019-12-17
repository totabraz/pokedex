import * as  actionsType from '../actions/actionsType'

const initialState = {
    pokemons: null,
    idPokemonActive: null,
    error:false,
}

const podekexReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.SET_ACTIVE_POKEMON:
            return {
                ...state,
                idPokemonActive: action.idPokemon
            }
        case actionsType.GET_POKEMONS:
            return {
                ...state,
                pokemons: action.pokemons
            }
        case actionsType.FETCH_POKEMONS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default podekexReducer