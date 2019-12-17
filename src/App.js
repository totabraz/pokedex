import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout'
import { Switch, Route } from 'react-router-dom'

import Pokedex from './containers/Pokedex/Pokedex'
import Pokeinfo from './containers/Pokeinfo/Pokeinfo'

function App() {
  return (
    <div className="App">

      <Layout>
        <Switch>
          <Route path='/pokemon' component={Pokeinfo} />
          <Route path='/' component={Pokedex} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
