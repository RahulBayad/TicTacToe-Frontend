import React from "react";

export const Button = React.memo(({ index, game, socket, roomId }) => {
    const updateMove = (index) => {
        if (!game.gameState[index]) {
          socket.emit("playerMove", { index, roomId });
        }
    };
    console.log("button renderd");
    
    return (
      <button
        className="h-[6.1rem] w-[100px]  rounded-md font-sans  shadow-[0px_0px_10px_#cdcdcd]
        text-[2.5rem] box-border outline-none border-gray-400"
        onClick={() => updateMove(index, game,)}
        style={{ color: `${game.gameState[index] === "X" ? "red" : "blue"}` }}
        disabled={game.winner || game.playerTurn !== socket.id}
      >
        {game.gameState[index]}
      </button>
    );
});