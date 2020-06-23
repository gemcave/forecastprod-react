import React, { useState, useEffect } from "react";
import { API_KEY } from "./apiKey";
import "./App.css";
import { Plot } from "./Plot";

export const App = () => {
  const [state, setState] = useState({
    location: "",
    data: {},
    dates: [],
    temps: [],
    selected: {
      date: "",
      temp: null,
    },
  });
  const [currentTemp, setCurrentTemp] = useState("Specify a location");

  useEffect(() => {
    if (state.data && state.data.list) {
      setCurrentTemp(state.data.list[0].main.temp);
    }
  }, [state.data]);

  const fetchData = (evt) => {
    evt.preventDefault();
    console.log("fetch data for", state.location);

    let location = encodeURIComponent(state.location);
    let urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?q=";
    let urlSuffix = "&APPID=" + API_KEY + "&units=metric";
    let url = urlPrefix + location + urlSuffix;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        var list = data.list;
        var dates = [];
        var temps = [];

        for (var i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }

        setState((state) => ({
          ...state,
          data,
          dates: dates,
          temps: temps,
          selected: {
            date: "",
            temp: null,
          },
        }));
      })
      .catch((e) => console.log(`error ${e}`));
  };

  const changeLocation = (evt) => {
    setState({
      location: evt.target.value,
    });
  };

  const onPlotClick = (data) => {
    if (data.points) {
      setState((state) => ({
        ...state,
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y,
        },
      }));
    }
  };

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={fetchData}>
        <label>
          I want to know the weather for
          <input
            placeholder={"City, Country"}
            type="text"
            value={state.location}
            onChange={changeLocation}
          />
        </label>
      </form>
      <p className="temp-wrapper">
        <span className="temp">{currentTemp}</span>
        <span className="temp-symbol">°C</span>
      </p>
      {state.data && state.data.list ? (
        <div className="wrapper">
          <p className="temp-wrapper">
            <span className="temp">
              {state.selected.temp ? state.selected.temp : currentTemp}
            </span>
            <span className="temp-symbol">°C</span>
            <span className="temp-date">
              {state.selected.temp ? state.selected.date : ""}
            </span>
          </p>
          <h2>Forecast</h2>
          <Plot
            xData={state.dates}
            yData={state.temps}
            type="scatter"
            onPlotClick={onPlotClick}
          />
        </div>
      ) : null}
    </div>
  );
};
