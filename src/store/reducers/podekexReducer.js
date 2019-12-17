import * as  actionsType from '../actions/actionsType'

const initialState = {
    pokemons: null,
    idPokemonActive: null,
    error:false
}

const podekexReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.SET_ACTIVE_POKEMON:
            return {
                ...state,
                idPokemonActive: action.idPokemon
            }
        default:
            return state
    }
}

export default podekexReducer