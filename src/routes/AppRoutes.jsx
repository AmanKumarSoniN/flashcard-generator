import React from "react";
 import { Routes, Route } from "react-router-dom";
  import CreateFlashcard from "../pages/CreateFlashcard"; import MyFlashcards from "../pages/MyFlashcards"; 
  import FlashcardDetails from "../pages/FlashcardDetails";

const AppRoutes = () => { return ( <Routes> <Route path="/" element={<CreateFlashcard />} />
 <Route path="/my-flashcards" element={<MyFlashcards />} /> 
 <Route path="/flashcard-details/:id" element={<FlashcardDetails />} /> </Routes> ); };

export default AppRoutes;