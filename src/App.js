import React from "react";
import "./App.css";
import Header from "./Components/Header.js";
import Newsapp from "./Components/Newsapp.js";
import Notes from "./Components/Noteapp/noteapp.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./Components/Weatherapp/Search.js";
import { InputProvider } from "./Context/inputContext.js";

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
          
          </Routes>
        </InputProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
