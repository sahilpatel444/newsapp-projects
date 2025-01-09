import React from "react";
import CreateNOte from "./create_note";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Note from "./note";
import './style.css'

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const data = JSON.parse(localStorage.getItem("mydata"));
    return data || [];
  });

  const [inputText, setInputText] = useState("");

  const TextHandel = (e) => {
    setInputText(e.target.value);
  };

  const SaveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText,
      },
    ]);
    setInputText("");
  };

  const deleteHandle = (id) => {
    const FilterNotes = notes.filter((note) => note.id !== id);
    setNotes(FilterNotes);
  };

  useEffect(() => {
    localStorage.setItem("mydata", JSON.stringify(notes));
  });

  useEffect(()=>{
    document.title ="Project - Note App"
  },[])

  return (
    <>
      
    
      <div className="notes">
        {notes.map((item) => (
          <Note id={item.id} text={item.text} deleteHandle={deleteHandle} />
        ))}

        <CreateNOte
          TextHandel={TextHandel}
          SaveHandler={SaveHandler}
          inputText={inputText}
        />
      </div>
    </>
  );
};
export default Notes;
