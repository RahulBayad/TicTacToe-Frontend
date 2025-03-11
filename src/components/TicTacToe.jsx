import React, { useEffect, useRef, useState } from "react";
import TicTacBoard from "./TicTacBoard";
import { initializeSocket } from "./js/socket.js";

const TicTacToe = () => {
  const [game, setGame] = useState({
    connection: null,
    roomId: null,
    playerTurn: false,
  });
  const socketInstance = useRef(null);

  useEffect(() => {
    let socket = initializeSocket();
    socket.emit("startGame");
    socketInstance.current = socket;

    socket.on("connect", () => console.log("sokcet connected", socket.id));
    socket.on("startGame", ({ connection, roomId, playerTurn }) => {
      if (connection) {
        setGame({ connection, roomId, playerTurn });
      }
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>

      {game.connection ? (
          <TicTacBoard
            roomId={game.roomId}
            playerTurn={game.playerTurn}
            socket={socketInstance.current}
          />
      ) : (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-indigo-600">
          <div className="p-8 bg-blue-50 rounded-3xl
            flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl py-1 text-center">Finding opponent...</h1>
            {/* <img src="./loading.gif" className="mt-8" /> */}
            <div className="mt-6 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <br />
            <a href="/" className=" bg-red-500 text-white font-medium text-lg rounded-lg px-6 py-2">Cancel</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
