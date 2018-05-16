import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = props =>
  props.heroes.map(hero => (
    <Link key={hero.id} to={`heroes/details/${hero.id}`}>
      <div className="dashboard-item">
        <h4>{hero.name}</h4>
      </div>
    </Link>
  ));

export default Dashboard;
