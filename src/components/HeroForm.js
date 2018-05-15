import React from "react";

const HeroForm = props => {
  return (
    <form onSubmit={e => props.handleFormSubmit(e)}>
      <input
        className="form-control"
        type="text"
        value={props.selectedHero.name}
        onChange={e => props.handleInputChange(e)}
      />
      <input className="btn btn-default" type="submit" value="submit" />
    </form>
  );
};

export default HeroForm;
