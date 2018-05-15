import React, { Component } from "react";
import HeroesList from "./HeroesList";
import HeroForm from "./HeroForm";
import "./App.css";
import { getHeroes } from "../heroes.service";

//const App = () => {
class App extends Component {
  state = {
    heroes: [],
    selectedHero: {
      name: "",
      id: undefined
    }
  };

  componentWillMount() {
    console.log("yay");
    getHeroes.then(payload => this.setState({ heroes: payload }));
  }

  componentDidMount() {
    console.log("yay2");
  }

  handleSelectedHero = hero => {
    //this.state.selectedHero = hero;
    this.setState({ selectedHero: hero });
    console.log(hero.name);
  };

  handleInputChange = event => {
    this.setState({
      selectedHero: {
        ...this.state.selectedHero,
        name: event.target.value
      }
    });
    console.log(event.target.value);
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (!this.state.selectedHero.id) {
      return;
    }

    const selectedHero = this.state.selectedHero;
    const heroes = this.state.heroes;

    const selectedHeroIndex = this.state.heroes
      .map(o => o.id)
      .indexOf(selectedHero.id);

    this.setState({
      heroes: [
        ...heroes.slice(0, selectedHeroIndex),
        selectedHero,
        ...heroes.slice(selectedHeroIndex + 1, heroes.length)
      ],
      selectedHero: {
        name: "",
        id: undefined
      }
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>React Heroes</h1>
          <HeroesList
            heroes={this.state.heroes}
            handleSelectedHero={this.handleSelectedHero}
          />
        </div>
        <HeroForm
          selectedHero={this.state.selectedHero}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default App;
