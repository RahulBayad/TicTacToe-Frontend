import React, { useEffect, useRef, useState } from 'react'
import TicTacBoard from './TicTacBoard';
import { initializeSocket } from './socket';

const TicTacToe = () => {
    const [game , setGame] = useState({connection : null, roomId : null, playerTurn : false})
    const socketInstance = useRef(null);

    useEffect(()=>{
        let socket = initializeSocket();       
        socket.emit("startGame")
        socketInstance.current = socket;

        socket.on("connect",()=>console.log("sokcet connected", socket.id))
        socket.on("startGame",({connection , roomId, playerTurn})=>{  
            if(connection){ setGame({connection, roomId, playerTurn}) }                   
        })
    },[])
    
return (
    <div>
        {
            game.connection ? 
            <TicTacBoard roomId={game.roomId} playerTurn={game.playerTurn} socket={socketInstance.current}/> 
            : 
            <div>
                <h1>Finding opponent</h1>
                <br />
                <a href="/"><button>Cancel</button></a>
            </div>
        }
    </div>
  )
}

export default TicTacToe