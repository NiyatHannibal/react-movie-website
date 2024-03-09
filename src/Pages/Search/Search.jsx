import React, { useState } from 'react';
import { HiSearch } from "react-icons/hi";
import axios from 'axios'; // Import Axios for making HTTP requests

function Search() {
  const [genre, setGenre] = useState('');
  const [showGenres, setShowGenres] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];

  const handleGenreSelect = (genre) => {
    setGenre(genre);
    setShowGenres(false);
  };

  const handleButtonSelect = (button) => {
    setSelectedButton(button);
    if (button === 'genre') {
      setShowGenres(true);
    }
  };

  const handleInputChange = (e) => {
    setGenre(e.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full px-4">
        <h1 className="text-2xl font-bold text-center mt-8 mb-8 transition-transform duration-300 transform hover:scale-105 ">Search Movies Based On the Category</h1>
        <div className="flex mb-4 gap-10">
          <button
            className={`bg-gray-700 text-gray-300 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105 ${selectedButton === 'genre' && 'bg-gray-500'}`}
            onClick={() => handleButtonSelect('genre')}
>
  Genre
</button>

          <button
            className={`bg-gray-700 text-gray-300 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105 ${selectedButton === 'movie' && 'bg-gray-500'}`}
            onClick={() => handleButtonSelect('movie')}
          >
            Movie Title
          </button>
          <button
            className={`bg-gray-700  text-gray-300 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105 ${selectedButton === 'actor' && 'bg-gray-500'}`}
            onClick={() => handleButtonSelect('actor')}
          >
            Actor Name
          </button>
        </div>
        <div className="relative mt-9 mb-9">
          <input
            className="appearance-none w-full bg-gray-300 border border-gray-300 text-gray-1000 py-5 px-8 pr-15 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="searchInput"
            type="text"
            placeholder="Search for a movie,series,..."
            value={genre}
            onChange={handleInputChange}
          />
          <button className="absolute right-0 top-0 bottom-0 mt-1 mr-4 bg-transparent rounded-full p-2">
          <HiSearch className="h-full w-auto text-white " />
          </button>

        </div>
        {selectedButton === 'genre' && showGenres && (
          <div className="bg-gray-200 border border-gray-300 p-2 rounded-md">
            {genres.map((genre, index) => (
              <div key={index} className="cursor-pointer hover:underline " onClick={() => handleGenreSelect(genre)}>
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
