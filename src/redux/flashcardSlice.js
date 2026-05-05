import { createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
  name: "flashcards", initialState: { flashcards: [], },
  reducers: {
    addFlashcard: (state, action) => { state.flashcards.push(action.payload); },
    deleteFlashcard: (state, action) => { state.flashcards = state.flashcards.filter((_, index) => index !== action.payload); },
  },
});

export const { addFlashcard, deleteFlashcard } = flashcardSlice.actions; export default flashcardSlice.reducer;