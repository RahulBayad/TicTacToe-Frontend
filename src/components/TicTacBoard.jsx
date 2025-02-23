import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "./css/tictacBoard.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const TicTacBoard = ({ socket, roomId, playerTurn }) => {
  const [game, setGame] = useState({ gameState: Array(9).fill(null), winner: null, playerTurn });
  const [connection, setConnection] = useState(true);
  const [timer , setTimer] = useState(60)
  const navigate = useNavigate();
  

  const updateMove = (index) => {
    console.log("index ", index);
    if (!game.gameState[index]) {
      socket.emit("playerMove", { index, roomId });
    } 
  };  
  const restartGame = () => {
    socket.emit("restart", { roomId });
  };
  const Button = React.memo(({ index }) => {
    return (
      <button
        onClick={() => updateMove(index)}
        style={{ color: `${game.gameState[index] === "X" ? "red" : "blue"}` }}
        disabled={game.winner || game.playerTurn !== socket.id}
      >
        {game.gameState[index]}
      </button>
    );
  });

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimer(time =>{
        if(time === 1){
          socket.emit("timeout",{roomId})
          clearInterval(interval)
          return 0
        }
        return time-1
      })
    },1000)
    return  ()=>clearInterval(interval)
  },[game])

  useEffect(() => { 
    const updateGame = ({ gameState, playerTurn, winner })=>{
      setGame({ gameState, winner, playerTurn });
      setTimer(60)
      console.log("update move", playerTurn);
      
    }
    socket.on("playerMove", updateGame);
    socket.on("timeout", updateGame);
    socket.on("restart", updateGame);
    socket.on("disconnected", ({ disconnect }) => {
      socket.disconnect(true);
      setConnection(false);
    });

    return () => socket.off("playerMove");
  }, []);

  useEffect(() => {
    // document.addEventListener("re")
    if (!connection) {
      navigate("/");
    }
  }, [connection]);

  return (
    <>
      <div className={css.playersContainer}>
        <div
          className={css.playerBox}
          style={{
            border: `${
              game.playerTurn === socket.id ? "3px solid #05ff01" : "none"
            }`,
          }}
        >
          <img src="user.png" height="25" alt="" />
          <div>You</div>
        </div>

        <div className={css.timeContainer}>
          <h4> {timer}</h4>
        </div>

        <div
          className={css.playerBox}
          style={{
            border: `${
              game.playerTurn !== socket.id ? "3px solid #05ff01" : "none"
            }`,
          }}
        >
          <img src="user.png" height="25" alt="" />
          <div>Opponent</div>
        </div>
      </div>
      <div className={css.ticTacContainer}>
        <Button index={0} className="button" />
        <Button index={1} className="button" />
        <Button index={2} className="button" />
        <Button index={3} className="button" />
        <Button index={4} className="button" />
        <Button index={5} className="button" />
        <Button index={6} className="button" />
        <Button index={7} className="button" />
        <Button index={8} className="button" />
      </div>
      {game.winner ? (
        game.winner === socket.id ? (
          <h2>You win</h2>
        ) : (
          <h2>You loss</h2>
        )
      ) : null}
      {!game.winner && !game.gameState.includes(null) && <h2>It's a Draw!</h2>}
      {game.winner && <button onClick={restartGame}>Restart game</button>}
      <button>
        <a href="/">Exit</a>
      </button>
    </>
    // </div>
  );
};

export default TicTacBoard;
