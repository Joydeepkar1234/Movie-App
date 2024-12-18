import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    const API_URL = `https://www.omdbapi.com/?s=Avengers&apikey=47846107`; 
    try {
      const { data } = await axios.get(API_URL);
      if (data.Search) {
        setMovies(data.Search);
      } else {
        console.error('No movies found:', data.Error);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const addToWatchlist = (movie: Movie) => {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    }
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Box
      sx={{
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          flex: 0.7, 
        }}
      >
        {movies.map((movie) => (
          <Box
            key={movie.imdbID}
            sx={{
              width: '250px',
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {movie.Title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', marginBottom: '12px' }}>
              {movie.Year}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginBottom: '8px',
                width: '100%',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
              onClick={() => addToWatchlist(movie)}
            >
              Add to Watchlist
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                width: '100%',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f44336',
                  borderColor: '#f44336',
                  color: 'white',
                },
              }}
              onClick={() => removeFromWatchlist(movie.imdbID)}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          width: '30%',
          padding: '16px',
          background: 'linear-gradient(145deg, #e0e0e0, #ffffff)',
          borderRadius: '12px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          maxHeight: '100vh',
          overflowY: 'auto', 
        }}
      >
        <Typography variant="h5" marginBottom={2} sx={{ fontWeight: 'bold', color: '#333' }}>
          Your Watchlist
        </Typography>
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <Box
              key={movie.imdbID}
              sx={{
                marginBottom: '12px',
                padding: '12px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                {movie.Title} ({movie.Year})
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  marginTop: '8px',
                  textTransform: 'none',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#f44336',
                    borderColor: '#f44336',
                    color: 'white',
                  },
                }}
                onClick={() => removeFromWatchlist(movie.imdbID)}
              >
                Remove
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: '#333' }}>
            Your watchlist is empty.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Movies;
