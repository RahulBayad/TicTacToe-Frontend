export const socketEvents = ((socket, setGame, setTimer, setConnection)=>{
    const updateGame = ({ gameState, playerTurn, winner }) => {
        setGame({ gameState, winner, playerTurn });
        setTimer(60);
    };
    socket.on("playerMove", updateGame);
    socket.on("timeout", updateGame);
    socket.on("restart", updateGame);
    socket.on("disconnected", ({ disconnect }) => {
        socket.disconnect(true);
        setConnection(false);
    })
})

export const restartGame = (roomId, socket) => socket.emit("restart", { roomId });