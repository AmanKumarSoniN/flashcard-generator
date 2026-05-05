import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFlashcard } from "../redux/flashcardSlice"; 
import { MdDeleteOutline } from "react-icons/md";

const MyFlashcards = () => {
  const flashcards = useSelector((state) => state.flashcards.flashcards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      dispatch(deleteFlashcard(index));
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Flashcards</h1>
      
      {flashcards.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-inner border-2 border-dashed">
           <p className="text-gray-500 mb-4">No flashcards found. Start by creating a new group!</p>
           <button 
             onClick={() => navigate("/")}
             className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
           >
             Create Now
           </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {flashcards.map((group, index) => (
              <div 
                key={index} 
                className="bg-white p-4 md:p-6 shadow-md rounded-xl flex flex-col items-center border border-gray-100 relative group transition-transform hover:scale-[1.02]"
              >
                
                <button 
                  onClick={() => handleDelete(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Group"
                >
                  <MdDeleteOutline size={24} />
                </button>

                
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-white shadow-sm">
                  {group.image ? (
                    <img src={group.image} alt="group" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-red-600 font-bold text-xl uppercase">{group.title.charAt(0)}</span>
                  )}
                </div>

                <h2 className="font-bold text-lg text-gray-800 text-center uppercase tracking-tight line-clamp-1">
                  {group.title}
                </h2>
                
                <p className="text-gray-500 text-sm line-clamp-2 text-center my-3 h-10">
                  {group.description}
                </p>
                
                <p className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest">
                  {group.terms.length} Cards
                </p>
                
                <button 
                  onClick={() => navigate(`/flashcard-details/${index}`)}
                  className="w-full text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  View Group
                </button>
              </div>
            ))}
          </div>

          
          <div className="mt-12 flex justify-end border-t pt-6">
             <button 
               onClick={() => navigate("/")}
               className="text-red-600 font-bold flex items-center gap-2 hover:underline"
             >
               + Create New Flashcard Group
             </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyFlashcards;