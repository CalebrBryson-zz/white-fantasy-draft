import React, { useState } from "react";
export default function DraftTable({ dispatch, draftedPlayers, draftError }) {
  console.log(draftedPlayers);
  const [draftKey, setDraftKey] = useState("");

  function renderDraftedPlayer(player) {
    return (
      <div key={player._id}>
        {`${player["Player Name"]}`}
        <button
          onClick={() => dispatch({ type: "undraft", payload: player._id })}
        >
          UnDraft Me
        </button>
      </div>
    );
  }

  return (
    <>
    <form>
      <input
        type="text"
        name="draftKey"
        value={draftKey}
        onChange={event => {
          setDraftKey(event.target.value);
        }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('hello');
          dispatch({ type: "draft", payload: draftKey });
          setDraftKey("");
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "draft", payload: draftKey });
          setDraftKey("");
        }}
      >
        Draft 
      </button>
<span className="error">{draftError}</span>
    </form>
      <div className="draftList">
        {draftedPlayers.map(player => {
          return renderDraftedPlayer(player);
        })}
      </div>
    </>
  );
}
