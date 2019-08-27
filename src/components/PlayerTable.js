import React from "react";
import "./PlayerTable.css";
export default function PlayerTable({ players, dispatch }) {
  function renderFilter() {
    const options = [
      "Rank",
      "Player Name",
      "Position",
      "Team",
      "Player code",
      "Projection Data",
      "Additional Notes"
    ];
    return (
      <>
        <span>Select Column Sort</span>
        <select
          onChange={event =>
            dispatch({ type: "setSort", payload: event.target.value })
          }
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </>
    );
  }

  function renderPositionSelect() {
    const positions = ["QB", "DEF", "K", "RB", "TE", "WR"];
    return (
      <>
        <span>Select Position Filter</span>
        <select
          onChange={event =>
            dispatch({ type: "setFilter", payload: event.target.value })
          }
        >
          {positions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <button onClick={() => dispatch({ type: "setFilter", payload: "" })}>
          Clear Filter
        </button>
      </>
    );
  }

  const classNames = {
    "Sleeper": "sleeper",
    "Watch": "watch",
    "Bust": "bust",
    "My Guy": "myGuy"
  };
  return (
    <>
      {renderFilter()}
      {renderPositionSelect()}
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>Rank</th>
            <th>Player Code</th>
            <th>Projection Data</th>
            <th>Additional Notes</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const classNameKey = player["Projection Data"];
            return (
              <tr
                key={index}
                className={
                  classNameKey
                    ? `row row-${classNames[classNameKey]}`
                    : "row"
                }
              >
                <td>{player["Player Name"]}</td>
                <td>{player.Position}</td>
                <td>{player.Team}</td>
                <td>{player.Rank}</td>
                <td>{player["Player code"]}</td>
                <td>{player["Projection Data"]}</td>
                <td>{player["Additional Notes"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
