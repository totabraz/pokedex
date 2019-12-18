import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string';
import * as pokedexActions from '../../store/actions/pokedexActions'
import Profile from '../../components/profile/profile'
import classes from './Pokeinfo.module.scss'

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
    
    getEvolutions = (evolutions, pokemons, label=null) => {
        const evolutionsList = []
        evolutions.forEach(evolution => {
            evolutionsList.push(pokemons.filter(evol =>
                (evol.Number == evolution.Number)
            ))
        })        
        return evolutionsList.map(evolution =>{
            return <Profile label={label} key={evolution[0].Number} infos={evolution[0]} />
        })
    }

    getNextEvolutions = (pokemon, pokemons) => {
        if (pokemon['Next evolution(s)']) {
            return this.getEvolutions(pokemon['Next evolution(s)'], pokemons, 'next')
        }
    }
    getPrevEvolutions = (pokemon, pokemons) => {
        if (pokemon['Previous evolution(s)']) {
            return this.getEvolutions(pokemon['Previous evolution(s)'], pokemons, 'prev')
        }
    }


    render() {
        let profile = (<div><p>Erro ao carregar.</p><p>Verifique se foi passado o ID</p><p>Ou se está conectado a internet</p></div>)
        let nextEvolutions = null
        let prevEvolutions = null
        if (this.props.pokemons) {
            let params = queryString.parse(this.props.location.search)
            const pokemon = this.props.pokemons.filter(pokemon => pokemon.Number === params.id)
            profile = <Profile infos={pokemon[0]} />
            console.log(pokemon[0])
            prevEvolutions = this.getPrevEvolutions(pokemon[0], this.props.pokemons)
            nextEvolutions = this.getNextEvolutions(pokemon[0], this.props.pokemons)
        }
        return (
            <div className={classes.Pokeinfo}>
                {profile}
                {prevEvolutions}
                {nextEvolutions}
            </div>
        )
    }
}



/**

About: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger."
Base Attack: "118 attack points."
Base Defense: "118 defense points."
Base Flee Rate: "10% chance to flee."
Base Stamina: "90 stamina points."
Buddy Distance: "3km (Medium)"
Fast Attack(s): (2) [{…}, {…}]
Generation: "Generation I"
Height: {Minimum: "0.61m", Maximum: "0.79m"}
MaxCP: 951
MaxHP: 1071
Name: "Bulbasaur"
Next Evolution Requirements: {Amount: 25, Name: "Bulbasaur candies"}
Next evolution(s): (2) [{…}, {…}]
Number: "001"
Resistant: (5) ["Water", "Electric", "Grass", "Fighting", "Fairy"]
Special Attack(s): (3) [{…}, {…}, {…}]
Types: (2) ["Grass", "Poison"]
Weaknesses: (4) ["Fire", "Ice", "Flying", "Psychic"]
Weight: {Minimum: "6.04kg", Maximum: "7.76kg"}
*/



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

