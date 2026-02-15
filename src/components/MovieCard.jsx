import { useState, useEffect } from "react";
import { useWatchlist } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const {addToWatchlist, removeFromWatchlist, isInWatchlist} = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  // favorites
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
    const isMovieFavorite = favorites.some(fav => fav.id === movie.id);
  setIsFavorite(isMovieFavorite);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovie', JSON.stringify(updatedFavorites));
      setIsFavorite(false); 
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovie', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  // watchlist
  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <div className="button-detail">
          <button
          className={`favorite-button ${isFavorite ?  'favorited' : ''}`} onClick={toggleFavorite}
          >
            {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
          </button>

          {/* Add and remove from watchlist */}
          <button 
            className={`watchlist-button ${inWatchlist ? 'added' : ''}`} onClick={handleWatchlistClick}
            >
            {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;