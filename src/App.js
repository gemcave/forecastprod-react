import React, { useState } from 'react';
import './App.css';

export const App = () => {
  const [state, setState] = useState({
      location: ''
  });
  
  const fetchData = (evt) => {
    evt.preventDefault();
    console.log('fetch data for', this.state.location);
  };

  const changeLocation = (evt) => {
    setState({
      location: evt.target.value
    });
  };

    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={state.location}
              onChange={changeLocation}
            />
          </label>
        </form>
      </div>
    );
}