import React from "react"; import { BrowserRouter as Router, Link } from "react-router-dom"; import AppRoutes from "./routes/AppRoutes";

function App() { return ( <Router> <div className="min-h-screen bg-gray-50 flex flex-col"> <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200"> <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"> <div className="text-xl font-bold tracking-tighter text-gray-800 uppercase"> My<span className="text-red-600">Flashcards</span> </div>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <Link to="/" className="text-sm font-bold text-gray-600 hover:text-red-600 transition">
            Create New
          </Link>
          <Link to="/my-flashcards" className="text-sm font-bold text-gray-600 hover:text-red-600 transition">
            My Flashcards
          </Link>
        </div>
      </nav>
    </header>

    <main className="flex-grow py-8">
      <AppRoutes />
    </main>
    
    
  </div>
</Router>
); }

export default App;