import React, { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaShare, FaDownload, FaPrint, FaCopy } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const FlashcardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);

  const flashcards = useSelector((state) => state.flashcards.flashcards);
  const card = flashcards[id];

  if (!card) return <div className="p-20 text-center font-bold">Flashcard not found!</div>;


  const handleDownloadPDF = async () => {
    const element = cardRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`${card.title}.pdf`);
    } catch (e) {
      alert("Please use the 'Print' button for PDF generation.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <button onClick={() => navigate("/my-flashcards")} className="flex items-center gap-2 mb-6 text-gray-500 hover:text-red-600 font-bold">
        <FaArrowLeft /> Back
      </button>

      <div className="mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 uppercase">{card.title}</h1>
        <p className="text-gray-500 mt-2">{card.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-3 bg-white p-3 md:p-4 shadow-sm rounded-xl border border-gray-100 h-fit">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-2">Other Flashcards</h2>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            {flashcards.map((f, index) => (
              <Link
                key={index}
                to={`/flashcard-details/${index}`}
                onClick={() => setActiveIdx(0)}
                className={`p-3 rounded-lg text-sm font-bold transition-all ${parseInt(id) === index ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {f.title}
              </Link>
            ))}
          </div>
        </div>


        <div className="lg:col-span-6 flex flex-col items-center">
          <div ref={cardRef} className="bg-white p-4 md:p-6 lg:p-10 rounded-2xl shadow-xl border border-gray-100 w-full min-h-[400px] flex flex-col items-center justify-center text-center">
            {card.terms[activeIdx].image && (
              <img src={card.terms[activeIdx].image} alt="" className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mb-6 rounded shadow-sm" />
            )}
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4">{card.terms[activeIdx].term}</h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{card.terms[activeIdx].definition}</p>
          </div>


          <div className="flex items-center gap-6 md:gap-12 mt-8">
            <button
              onClick={() => setActiveIdx((prev) => (prev === 0 ? card.terms.length - 1 : prev - 1))}
              className="text-3xl text-gray-300 hover:text-red-600 transition"
            >
              <FaArrowLeft />
            </button>
            <span className="text-lg font-bold text-gray-800">{activeIdx + 1} / {card.terms.length}</span>
            <button
              onClick={() => setActiveIdx((prev) => (prev === card.terms.length - 1 ? 0 : prev + 1))}
              className="text-3xl text-gray-300 hover:text-red-600 transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>


        <div className="lg:col-span-3 flex flex-col gap-4">
          <button onClick={() => setShowModal(true)} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md font-bold text-gray-600 transition">
            <FaShare className="text-blue-500" /> Share
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md font-bold text-gray-600 transition">
            <FaDownload className="text-green-500" /> Download
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md font-bold text-gray-600 transition">
            <FaPrint /> Print
          </button>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Share Link</h2>
            <div className="flex items-center border p-3 rounded-lg bg-gray-50 mb-6">
              <input readOnly value={window.location.href} className="bg-transparent flex-1 text-xs truncate outline-none font-mono" />
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Copied!"); }} className="ml-2">
                <FaCopy className="text-red-600 hover:text-red-800" />
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-black transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardDetails;