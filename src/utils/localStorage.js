export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("flashcards", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("flashcards");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    return [];
  }
};