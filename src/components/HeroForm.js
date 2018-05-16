import React, { Component } from "react";
import { getHeroById } from "../heroes.service";

class HeroForm extends Component {
  state = {
    hero: {}
  };

  componentWillMount() {
    getHeroById(parseInt(this.props.match.params.id)).then(payload =>
      this.setState({ hero: payload })
    );
  }

  handleInputChange = event => {
    this.setState({
      hero: {
        ...this.state.hero,
        name: event.target.value
      }
    });
    console.log(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.hero);
    this.props.history.goBack();
  };

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h3>{this.state.hero.name} details</h3>
        <input
          className="form-control"
          type="text"
          value={this.state.hero.name}
          onChange={e => this.handleInputChange(e)}
        />
        <input className="btn btn-default" type="submit" value="submit" />
      </form>
    );
  }
}

export default HeroForm;
