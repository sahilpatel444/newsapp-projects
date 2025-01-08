import React from "react";
import Search from "../MovieSearchapp/Search";
import Result from "./Result";

const HomePage = () => {
  return (
    <div style={{backgroundColor:"black", height:"fit-content"}}>

      <Search  />
      <Result/>
    </div>
  );
};

export default HomePage;
