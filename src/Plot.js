/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

export const Plot = (props) => {
  useEffect(() => {
    drawPlot();
  }, [props.type, props.xData, props.yData]);

  const drawPlot = () => {
    window.Plotly.newPlot(
      "plot",
      [
        {
          x: props.xData,
          y: props.yData,
          type: props.type,
        },
      ],
      {
        margin: {
          t: 0,
          r: 0,
          l: 30,
        },
        xaxis: {
          gridcolor: "transparent",
        },
      },
      {
        displayModeBar: false,
      }
    );
  };

  return <div id="plot"></div>;
};
