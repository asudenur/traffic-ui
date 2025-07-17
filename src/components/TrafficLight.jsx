import React from "react";
import "./TrafficLight.css";

function TrafficLight({ state, direction }) {
  const isOff = !state;
  return (
    <div className="traffic-light">
      <div className={`light red ${state === "red" || state === "red-yellow" ? "on" : ""} ${isOff ? "off" : ""}`}></div>
      <div className={`light yellow ${state === "yellow" || state === "red-yellow" ? "on" : ""} ${isOff ? "off" : ""}`}></div>
      <div className={`light green ${state === "green" ? "on" : ""} ${isOff ? "off" : ""}`}></div>
    </div>
  );
}

export default React.memo(TrafficLight); 