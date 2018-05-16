import React, { Component } from "react";
import HeroesList from "./HeroesList";
import HeroForm from "./HeroForm";
import Dashboard from "./Dashboard";
import "./App.css";
import { getHeroes } from "../heroes.service";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
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

  handleFormSubmit = hero => {
    //event.preventDefault();

    // if (!this.state.selectedHero.id) {
    //   return;
    // }

    const selectedHero = hero;
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

  //findHeroById = id => this.state.heroes.find(hero => hero.id === id);

  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavLink exact to="/">
              DashBoard
            </NavLink>
            |
            <NavLink exact to="/heroes">
              Heroes
            </NavLink>
          </nav>
          <hr />
          <Route
            exact
            path="/heroes"
            render={props => (
              <HeroesList
                heroes={this.state.heroes}
                handleSelectedHero={this.handleSelectedHero}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={props => <Dashboard heroes={this.state.heroes} />}
          />
          <Route
            exact
            path="/heroes/details/:id"
            render={props => (
              <HeroForm {...props} handleFormSubmit={this.handleFormSubmit} />
            )}
          />
        </div>
      </Router>
    );
  }
}

{
  /* <div>
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
</div> */
}

export default App;
