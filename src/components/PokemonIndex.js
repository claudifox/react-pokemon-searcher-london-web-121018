import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchTerm: "",
  }

  componentDidMount() {
    return fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
      .then(pokemons => this.setState({pokemons: pokemons}))
  }

  onSearchChange = event => {
    event.preventDefault()
    this.setState({
      searchTerm: event.target.value
    })
    // this.filteredPokemons()
  }

  // filteredPokemons = () => {
  //   if(this.state.searchTerm !== "") {
  //     this.state.pokemons.filter((pokemon) => {
  //         return pokemon.name.includes(this.state.searchTerm)})
  //   }
  // }

  createNewPokemon = newPokemon => {
    fetch('http://localhost:3000/pokemon', {
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      body: JSON.stringify({
        name: newPokemon.name,
        stats: [
          {value: newPokemon.hp, name: 'hp'}
        ],
        sprites: {
          front: newPokemon.frontUrl,
          back: newPokemon.backUrl
        }
      })
    })
    .then(response => response.json())
    .then(pokemons => this.setState({pokemons: pokemons}))

  }

  render() {
    const filteredPokemons = this.state.pokemons.filter((pokemon) => {
        return pokemon.name.includes(this.state.searchTerm)
      })
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          // onSearchChange={_.debounce(() => console.log('🤔'), 500)}
          onSearchChange={this.onSearchChange}
          showNoResults={false}
          value={this.state.searchTerm}
        />
        <br />
        <PokemonCollection pokemons={filteredPokemons}/>
        <br />
        <PokemonForm createNewPokemon={this.createNewPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
