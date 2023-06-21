import { useState, useEffect } from 'react';

export const useLocalStorageState = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedWatchedMovies = localStorage.getItem(key);
    return JSON.parse(storedWatchedMovies) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
