import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import PlayerTable from "./PlayerTable";

export default function FantasyContainer() {
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    axios
      .get("https://fantasy-backend.herokuapp.com/api/players")
      .then(({ data }) => {
        setFetched(true);
        return dispatch({ type: "setPlayers", payload: data });
      });
  }, []);

  const initialState = {
    sort: "Position",
    playersById: {},
    sortedIds: []
  };

  function playerIdsByFilter(sort, players) {
    const sortedPlayers = Object.entries(players)
      .sort((player1, player2) => {
        const value1 = player1[1];
        const value2 = player2[1];
        if (value1["Rank"] < value2["Rank"]) {
          return -1;
        }
        if (value1["Rank"] > value2["Rank"]) {
          return 1;
        }

        // names must be equal
        return 0;

      })
      .sort((player1, player2) => {
        const value1 = player1[1];
        console.log(value1[sort]);
        const value2 = player2[1];
        if (value1[sort] < value2[sort]) {
          return -1;
        }
        if (value1[sort] > value2[sort]) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      .map(player => {
        return player[0];
      });
    return sortedPlayers;
  }

  function reducePlayersById(players) {
    return players.reduce((acc, player) => {
      const id = player._id;
      delete player._id;
      acc[id] = player;
      return acc;
    }, {});
  }

  function reducer(state, action) {
    console.log({action});
    switch (action.type) {
      case "setPlayers": {
        const playersById = reducePlayersById(action.payload);
        const sortedIds = playerIdsByFilter(state.sort, playersById);
        return {
          ...state,
          playersById,
          sortedIds
        };
      }
      case "setSort": {
        const sort = action.payload;
        const sortedIds = playerIdsByFilter(sort, state.playersById);
        console.log(sortedIds);
        return {
          ...state,
          sort,
          sortedIds
        };
      }
      default:
        throw new Error();
    }
  }


  const [state, dispatch] = useReducer(reducer, initialState);
  function selectFilteredPlayers(state) {
    return state.sortedIds.map(playerId => {
      return state.playersById[playerId];
    });
  }
      console.log({state});
  return (
    <div>
      {!fetched ? (
        <div>Loading.... </div>
      ) : (
        <PlayerTable players={selectFilteredPlayers(state)} dispatch={dispatch} />
      )}
    </div>
  );
}
