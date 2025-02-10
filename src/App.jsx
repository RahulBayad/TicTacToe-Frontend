import "./App.css";
import TicTacBoard from "./components/TicTacBoard";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <h1 id="appHeading">Tic Tac Toe</h1>
      <div className="startGameContainer">
        <img src="./ticTacImg.png" id="ticTacImage" alt="" />
        <NavLink to="/game">
          <button className="play-btn">Play</button>
        </NavLink>
      </div>
    </div>
  );
}

export default App;
