import "./App.css";
import { NavLink } from "react-router";
import Home from "./components/Home";
import TicTacBoard from "./components/TicTacBoard";

function App() {

  return (
    <>
    {/* <header className="w-full p flex justify-between py-2 px-8 items-center bg-blue-950">
        <h1 className="text-5xl font-bold">Tic Tac Toe</h1>
    </header> */}
    <Home/>
    </>
  )
}

export default App
