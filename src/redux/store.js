import { configureStore } from "@reduxjs/toolkit"; import flashcardReducer from "./flashcardSlice"; 
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorage";

const persistedFlashcards = loadFromLocalStorage();

export const store = configureStore({ reducer: { flashcards: flashcardReducer, },

preloadedState: { flashcards: { flashcards: persistedFlashcards || [], }, }, });

store.subscribe(() => { const state = store.getState(); saveToLocalStorage(state.flashcards.flashcards); });

