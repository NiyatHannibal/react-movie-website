// import React, { useState } from 'react';
// import { HiSearch } from "react-icons/hi";
// import axios from 'axios'; // Import Axios for making HTTP requests

// function Search() {
//   const [genre, setGenre] = useState('');
//   const [showGenres, setShowGenres] = useState(false);
//   const [selectedButton, setSelectedButton] = useState('');

//   const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];

//   const handleGenreSelect = (genre) => {
//     setGenre(genre);
//     setShowGenres(false);
//   };

//   const handleButtonSelect = (button) => {
//     setSelectedButton(button);
//     if (button === 'genre') {
//       setShowGenres(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     setGenre(e.target.value);
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="max-w-md w-full px-4">
//         <h1 className="text-2xl font-bold text-center mt-8 mb-8 transition-transform duration-300 transform hover:scale-105 ">Search Movies Based On the Category</h1>
//         <div className="flex mb-4 gap-10">
//           <button
//             className={`bg-gray-700 text-gray-300 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105 ${selectedButton === 'genre' && 'bg-gray-500'}`}
//             onClick={() => handleButtonSelect('genre')}
// >
//   Genre
// </button>

//           <button
//             className={`bg-gray-700 text-gray-300 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105 ${selectedButton === 'movie' && 'bg-gray-500'}`}
//             onClick={() => handleButtonSelect('movie')}
//           >
//             Movie Title
//           </button>
//           <button
//             className={`bg-gray-700  text-gray-300 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline transition-transform duration-300 transform hover:scale-105 ${selectedButton === 'actor' && 'bg-gray-500'}`}
//             onClick={() => handleButtonSelect('actor')}
//           >
//             Actor Name
//           </button>
//         </div>
//         <div className="relative mt-9 mb-9">
//           <input
//             className="appearance-none w-full bg-gray-300 border border-gray-300 text-gray-1000 py-5 px-8 pr-15 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             id="searchInput"
//             type="text"
//             placeholder="Search for a movie,series,..."
//             value={genre}
//             onChange={handleInputChange}
//           />
//           <button className="absolute right-0 top-0 bottom-0 mt-1 mr-4 bg-transparent rounded-full p-2">
//           <HiSearch className="h-full w-auto text-white " />
//           </button>

//         </div>
//         {selectedButton === 'genre' && showGenres && (
//           <div className="bg-gray-200 border border-gray-300 p-2 rounded-md">
//             {genres.map((genre, index) => (
//               <div key={index} className="cursor-pointer hover:underline " onClick={() => handleGenreSelect(genre)}>
//                 {genre}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import './search.css'; // Import the CSS file for styling

const API_KEY = '9a74db84a98e27257a0f5b7f83b21e02'; // Replace with your API key

const Search= () => {
  const [movies, setMovies] = useState([]);
  const [actorName, setActorName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filmTitle, setFilmTitle] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&`;
      if (actorName) {
        const actorResponse = await fetch(
          `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName}`
        );
        const actorData = await actorResponse.json();
        if (actorData.results.length > 0) {
          const actorId = actorData.results[0].id;
          url += `with_cast=${actorId}&`;
        }
      }
      if (selectedGenre) {
        url += `with_genres=${selectedGenre}&`;
      }
      if (filmTitle) {
        url += `query=${filmTitle}&`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="input"
          type="text"
          placeholder="Actor Name"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />
        <select
          className="select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="27">Horror</option>
        </select>
        <input
          className="input"
          type="text"
          placeholder="Film Title"
          value={filmTitle}
          onChange={(e) => setFilmTitle(e.target.value)}
        />
        <button className="button" type="submit">Search</button>
      </form>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};





export default Search;
