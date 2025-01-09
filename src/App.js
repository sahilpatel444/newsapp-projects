import React from "react";
import "./App.css";
import Header from "./Components/Header.js";
import Newsapp from "./Components/Newsapp.js";
import Notes from "./Components/Noteapp/noteapp.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./Components/Weatherapp/Search.js";
import { InputProvider } from "./Context/inputContext.js";
import HomePage from "./Components/MovieSearchapp/HomePage.js";
import Login from "./Components/Login/login.js"

function App() {
  return (
    <>
      <BrowserRouter>
        <InputProvider>
            <Header />
      
          <Routes>
            <Route path="/" element={<Newsapp />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/weather" element={<Search />} />
            <Route path="/movie" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
          
          </Routes>
       
        </InputProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
