import React from "react";
export default function PlayerTable({ players, dispatch }) {
  function renderFilter() {
    const options = [
      "Player Name",
      "Position",
      "Team",
      "Rank",
      "Player code",
      "Projection Data",
      "Additional Notes"
    ];
    return (
      <select
        onChange={event =>
          dispatch({ type: "setSort", payload: event.target.value })
        }
      >
        {options.map((option, index) => {
          return <option key={index} value={option}>{option}</option>;
        })}
      </select>
    );
  }
  return (
    <>
      {renderFilter()}
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
            return (
              <tr key={index}>
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
