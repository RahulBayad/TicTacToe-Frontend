import React from "react";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen absolute top-0 bg-gradientto-b from-white to-blue-300">
      <header>
        <nav className="bg-black absolute w-screen top-0 left-0 px-20 py-3 flex justify-between">
          <h2 className="text-white text-2xl ">Tic Tac Club!</h2>
          <div className="flex gap-3">
            <button className=" text-white px-4 py-1 rounded-2xl">Login</button>
            <button className="bg-white px-4 py-1 rounded-2xl hover:bg-gray-200">Sign Up</button>
          </div>
        </nav>
      </header>
      <section className="flex   justify-center items-center flex-col">
        <h2 className="text-5xl font-extrabold tracking-wider mb-4">
          Welcome to Tic-Tac-Toe!
        </h2>
        {/* <p className="mt-2 mb-6 tracking-widest">
          Play the classic game with friends, online, or against AI.
        </p> */}

        <div className="grid grid-cols-2 mt-5 gap-4 w-full transition">
          <NavLink
            className="bg-blue-500 text-center text-white px-6 py-3 rounded-lg w-full 
            font-semibold hover:bg-blue-600 transition-all duration-100"
          >
            Local Multiplayer
          </NavLink>
          <NavLink
            to="/game"
            className="bg-green-500 text-center text-white px-6 py-3 rounded-lg w-full 
            font-semibold hover:bg-green-600 transition-all duration-100"
          >
            Play Online
          </NavLink>
          <NavLink 
            className="bg-purple-500 text-center text-white px-6 py-3 rounded-lg w-full 
            font-semibold hover:bg-purple-600 transition-all duration-100">
            Join Room
          </NavLink>
          <NavLink 
            className="bg-red-500 text-center text-white px-6 py-3 rounded-lg w-full
            font-semibold hover:bg-red-600 transition-all duration-100">
            Create Room
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
