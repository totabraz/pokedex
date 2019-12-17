import React from 'react'
import classes from './profile.module.scss'
import * as utils from '../../utils/utils'

const profile = (props) => {
    const getAttacks = (attacks) => {
        return attacks.map(attack => {
            return (
                <li key={attack.Name}>
                    <p className={classes.AttacksName}>{attack.Name}</p>
                    <p><strong>Type: </strong>{attack.Type}</p>
                    <p><strong>Damage: </strong>{attack.Damage}</p>
                </li>
            )
        })
    }

    const pokemon = props.infos
    const fastAttacks = getAttacks(pokemon['Fast Attack(s)'])
    const specialAttacks = getAttacks(pokemon['Special Attack(s)'])
    return (
        <div className={classes.Profile}>
            <h1>{pokemon['Name']}</h1>
            <p> <strong>Generation: </strong> {utils.getGeneration(pokemon['Generation'])}</p>
            <p> <strong>About: </strong> {pokemon['About']}</p>
            <p> <strong>Types: </strong> {pokemon['Types'].join(', ')}</p>
            <p> <strong>Resistant: </strong> {pokemon['Resistant'].join(', ')}</p>
            <p> <strong>Weaknesses: </strong> {pokemon['Weaknesses'].join(', ')}</p>

            <p><strong>Fast Attack(s)</strong></p>
            <ul className={classes.AttackList}>{fastAttacks}</ul>
            <p><strong>Special Attack(s)</strong></p>
            <ul className={classes.AttackList}>{specialAttacks}</ul>
        </div>
    )
}

export default profile