import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import { searchMovies } from './services/movieService';
import { useState } from 'react';
import WantToWatch from './pages/wantToWatch';
import { WatchlistProvider } from './contexts/MovieContext';


// search
function App() {
  // search state
  const [searchResults, setSearchResults] = useState([]);
  // handler function
  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setSearchResults(results);
  };



  return (
    <WatchlistProvider> {/* Everyhing inside of WatchlistProvider can access the watchlist contetnt */}
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/wanttowatch" element={<WantToWatch />}/>
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  );
};

export default App;