import { useState, useEffect } from 'react';

const KEY = '6904a7cf';

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // callback?.();

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal }
        );

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('Movie Not Found');
        }

        setMovies(data.Search);
        setError('');

        setIsLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
