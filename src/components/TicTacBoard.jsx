import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ticTacUtil/componentUtils.jsx";
import { socketEvents, restartGame } from "./ticTacUtil/socketUtils.js";

const TicTacBoard = ({ socket, roomId, playerTurn }) => {
  const [game, setGame] = useState({
    gameState: Array(9).fill(null),
    winner: null,
    playerTurn,
  });
  const [connection, setConnection] = useState(true);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (game.winner || !game.gameState.includes(null)) return; // Stop timer if game over

    intervalRef.current = setInterval(() => {
      setTimer((time) => {
        if (time === 1) {
          socket.emit("timeout", { roomId });
          clearInterval(intervalRef.current);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [game]);

  useEffect(() => {
    socketEvents(socket, setGame, setTimer, setConnection);
    return () => socket.off("playerMove");
  }, []);

  useEffect(() => {
    if (!connection) {
      navigate("/");
    }
  }, [connection]);

  return (
    <div className="h-screen bg-gradient-to-b from-blue-500 to-indigo-600">
      <div className="h-screen bg-gradient-to-b flex flex-col">
        <nav className="w-full grid grid-flow-col py-[10px] px-[100px] justify-center items-center gap-2 box-border">
          <div
            className={`flex items-center gap-4 px-2.5 py-2 w-[10rem] bg-white rounded-[5px] text-[1.3rem] 
            ${game.playerTurn === socket.id ? "border-4 border-red-500" : ""}`}
          >
            <img src="user.png" width="30" className="rounded-sm p-[4px]" />
            <div className="text-lg">You</div>
          </div>

          <div className=" rounded-[5px] h-[3.3rem] border w-[3.3rem] bg-white z-10 flex justify-center items-center relative">
            <h4 className="text-center  font-bold p-2  text-lg"> {timer}</h4>
          </div>

          <div
            className={`flex items-center gap-4 px-2.5 py-2 w-[10rem] bg-white rounded-[5px] text-[1.3rem]
            ${game.playerTurn !== socket.id ? "border-4 border-red-500" : ""}`}
          >
            <img src="user.png" width="30" className="rounded-sm p-[4px]" />
            <div className="text-lg">Opponent</div>
          </div>
        </nav>

        {game.winner ? (
          game.winner === socket.id ? (
            <h2 className="text-center mt-5 text-4xl text-white font-bold">
              You win
            </h2>
          ) : (
            <h2 className="text-center mt-5 text-4xl text-white font-bold">
              You loss
            </h2>
          )
        ) : null}
        {!game.winner && !game.gameState.includes(null) && (
          <h2 className="text-center mt-5 text-4xl text-white font-bold">
            It's a Draw!
          </h2>
        )}

        <div className="grid grid-cols-3 bg-white  gap-4 p-4 rounded-lg mx-auto mt-5">
          {game.gameState.map((value, index) => {
            return (
              <Button
                key={index}
                index={index}
                socket={socket}
                game={game}
                roomId={roomId}
              />
            );
          })}
        </div>
        <br />

        <div className="flex justify-center gap-2">
          <a
            className="bg-red-500 w-44 text-center rounded-md py-2 px-6 no-underline text-lg shadow-inner text-white hover:bg-red-600"
            href="/"
          >
            Exit
          </a>
          {(!game.gameState.includes(null) || game.winner) && (
            <button
              onClick={() => restartGame(roomId, socket)}
              className="text-center w-44 bg-[rgb(45,45,45)]
             text-white px-6 py-2 rounded-md "
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacBoard;
