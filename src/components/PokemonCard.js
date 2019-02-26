import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    pokemonImage: this.props.pokemon.sprites.front,
    toggle: false
  }

  handleClick = event => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    const hp = this.props.pokemon.stats.find(stat => stat.name === "hp")
    return (
      <Card key={this.props.pokemon.id}>
        <div>
          <div className="image" onClick={this.handleClick}>
            {this.state.toggle ? <img alt="back" src={this.props.pokemon.sprites.back}/> : <img alt="front" src={this.props.pokemon.sprites.front}/> }
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp.value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
