import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import PlayerTable from "./PlayerTable";
import DraftTable from "./DraftTable";
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
    filter: "",
    sort: "Position",
    playersById: {},
    sortedIds: [],
    draftError: "",
    draftedPlayers: []
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
        const value2 = player2[1];
        /* this is meant to drive empty comparisons to the bottom 
        if(!value1[sort]){
          console.log(value1[sort]);
          return 1;
        }
        */
        if (value1[sort] < value2[sort]) {
          return -1;
        }

        if (!value1[sort] || value1[sort] > value2[sort]) {
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
      acc[id] = player;
      return acc;
    }, {});
  }

  function reducer(state, action) {
    console.log({ action });
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
      case "setFilter": {
        return {
          ...state,
          filter: action.payload
        };
      }
      case "draft": {
        const draftedPlayers = [...state.draftedPlayers];
        try {
          const draftKey = action.payload.toUpperCase();
          const draftPlayer = Object.values(state.playersById).find(player => {
            const playerDraftKey = player["Player code"];
            return draftKey === playerDraftKey.toUpperCase();
          });
          draftedPlayers.push(draftPlayer._id);
          return {
            ...state,
            draftedPlayers,
            draftError: ''
          };
        } catch (error) {
          return {
            ...state,
            draftError: `could not find player with code: ${action.payload} `
          };
        }
      }
      case "undraft": {
        const draftedPlayers = state.draftedPlayers.filter(playerId => {
          return playerId !== action.payload;
        });
        return {
          ...state,
          draftedPlayers
        };
      }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  function selectPlayers(state) {
    //sort players
    const sortedPlayers = state.sortedIds.map(playerId => {
      return state.playersById[playerId];
    }).filter(player => {
      return !state.draftedPlayers.includes(player._id)
    });
    if (state.filter) {
      // if filtered
      return sortedPlayers.filter(player => {
        return player.Position === state.filter;
      });
    }
    return sortedPlayers;
  }

  function selectDraftedPlayers(state) {
    return state.draftedPlayers.map(playerId => {
      return state.playersById[playerId];
    });
  }

  console.log({ state });
  return (
    <div>
      {!fetched ? (
        <div>Loading.... </div>
      ) : (
        <>
          <DraftTable
            dispatch={dispatch}
            draftedPlayers={selectDraftedPlayers(state)}
            draftError={state.draftError}
          />
          <PlayerTable players={selectPlayers(state)} dispatch={dispatch} />
        </>
      )}
    </div>
  );
}
