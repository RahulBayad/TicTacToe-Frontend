import React, { useCallback, useEffect, useRef, useState } from 'react'
import css from "./tictacBoard.module.css"
import { NavLink, useNavigate } from 'react-router-dom';

const TicTacBoard = ({socket , roomId, playerTurn}) => {
    
  const [game , setGame] = useState({gameState : [], winner: null, playerTurn});
  const [connection , setConnection] = useState(true)
  const navigate = useNavigate();
      
  const updateMove = (index)=>{   
      console.log("index ",index);
        if(!game.gameState[index]){
          socket.emit("playerMove", {index , roomId})
        }
  }
  const restartGame = ()=>{   
        socket.emit("restart", {roomId})
  }
  const Button = React.memo(({index})=>{
      console.log("button re-rendered");
      
      return( 
        <button 
          onClick={()=>updateMove(index)} 
          disabled={game.winner || game.playerTurn !== socket.id}
        >{game.gameState[index]}</button>
      )
  })

  useEffect(()=>{
    socket.on("playerMove",({ gameState, playerTurn, winner })=>{
      setGame({gameState,winner,playerTurn})
    })
    socket.on("restart",({gameState, playerTurn, winner})=>{
      setGame({gameState, playerTurn, winner})
      
    })
    socket.on("disconnected",({disconnect})=>{
      socket.disconnect(true)
      setConnection(false)
    })

    return () => socket.off("playerMove");
  },[])

  useEffect(()=>{
    if(!connection){
      navigate("/")
    }
  },[connection])

return (
    <>
        <div className={css.ticTacContainer}>
            <Button index={0} className="button"/>
            <Button index={1} className="button"/>
            <Button index={2} className="button"/>
            <Button index={3} className="button"/>
            <Button index={4} className="button"/>
            <Button index={5} className="button"/>
            <Button index={6} className="button"/>
            <Button index={7} className="button"/>
            <Button index={8} className="button"/>
        </div>
        {/* {game.winner && <h2>Winner: {game.winner}</h2>} */}
        {game.winner ? ( game.winner === socket.id ? <h2>You win</h2> : <h2>You loss</h2> ): null}
        {!game.winner && !game.gameState.includes(null) && <h2>It's a Draw!</h2>}
        <button onClick={restartGame}>Restart game</button>
        <button><a href="/">Exit</a></button>
    </> 
    // </div> 
  
)}

export default TicTacBoard