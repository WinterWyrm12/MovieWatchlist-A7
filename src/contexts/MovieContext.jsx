import { createContext, useState, useContext, useEffect } from "react";

// context creation
const MovieContext = createContext();

// custom hook for context consumption
export function useWatchlist() {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useWatchlist must be used within WatchlistProvider');
    }
    return context;
};

// provider
export function WatchlistProvider({children}) {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem ("watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(()=> {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(r => r.id === movie.id)) {
            setWatchlist(prev => [...prev, movie]);
        }
    }

    const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
    };

    const value = {
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist
    };


    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};

