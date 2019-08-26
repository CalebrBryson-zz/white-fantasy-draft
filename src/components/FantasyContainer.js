import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function FantasyContainer() {

  const [players, setPlayers] = useState([]);

  useEffect(()=> {
    axios.get('https://fantasy-backend.herokuapp.com/api/players').then(data => {return setPlayers(data)});
  },[]);




  return (
    <div>
      <span>{JSON.stringify(players)}</span>
    </div>
  );
}
