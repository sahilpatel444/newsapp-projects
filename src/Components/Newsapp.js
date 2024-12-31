/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react'
// import Card from './Card'

// const Newsapp = () => {
//   const [search, setSearch] = useState("india")
//   const [newsData, setNewsData] = useState(null)
//     const API_KEY ="3111f5f1aebb4d6e918e28ada71eb559"

//     const getdata =async()=>{
//        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
//        const jsonData= await response.json()
//        console.log(jsonData.articles)
//        setNewsData(jsonData.articles)
//     }

//     const handleInput =(e)=>{
//         console.log(e.target.value)
//         setSearch(e.target.value)

//     }

// real time search funcnality

import React, {  useContext, useEffect } from "react";
import Card from "./Card";
import { InputContext } from "../Context/inputContext";
import newslogo from '../assets/image/newslogo.png'

const Newsapp = () => {
  
  // const [newsData, setNewsData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
 
 

  const {search,getdata,isLoading,theme}=useContext(InputContext)
 

  //   const API_KEY = "pub_628774e85da7abab9369032f5793cba237d7a";

    // Debouncing logic: Fetch data only after the user stops typing
    useEffect(() => {
      const timer = setTimeout(() => {
        getdata(search);
      }, 300); // 300ms delay
      return () => clearTimeout(timer); // Clear timer on input change
            
    }, []); // Trigger on search input change
  


 
 
    return (
      <div className={`dark-navbar ${theme}`}>
        <nav className= 'navbarnews' >
         <div >

         <img src={newslogo} width={150} className="" alt="newslogo"/>
         </div>
          
          <ul>
            <a>All News</a>
            <a >news video</a>
          </ul>
          
        </nav>
        <div>
          <p className="head">Stay Update with TrendyNews</p>
        </div>

        <div className="categoryBtn">
          <button>Sports</button>
          <button>Politics</button>
          <button>Entertainment</button>
          <button>Health</button>
          <button>Fitness</button>
        </div>

        <div>{isLoading ? <p>Loading...</p> : <Card  />}</div>
      </div>
    );
  };


export default Newsapp;
