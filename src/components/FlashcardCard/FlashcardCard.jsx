import React from "react"; import { useNavigate } from "react-router-dom"; import { FaTrash } from "react-icons/fa";

const FlashcardCard = ({ card, index, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow-sm bg-white relative group">
      {card.image && <img src={card.image} alt="flashcard" className="w-full h-40 object-cover mb-2 rounded" />}
      <h2 className="font-bold text-lg">{card.title}</h2>
      <p className="text-gray-600 line-clamp-2">{card.description}</p>
      <p className="text-xs text-gray-400 mt-2">{card.terms.length} Cards</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate(`/flashcard-details/${index}`)} className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">View Cards</button>
        <button onClick={() => onDelete(index)} className="p-2 text-red-500 border border-red-500 rounded hover:bg-red-50"><FaTrash /></button>
      </div>
    </div>
  );
};

export default FlashcardCard;