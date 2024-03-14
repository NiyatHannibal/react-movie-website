import React from 'react'
import { Link } from 'react-router-dom';
import playIcon from '../assets/Images/playIcon.png';
import heartIcon from '../assets/Images/heartIcon.png';
function Moviepagecard({ movie, handleAddToFavourite }) {
  return (
    <div className="flex flex-col items-center relative group" style={{ width: '600px' }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="w-full h-72 object-cover shadow-lg mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
        alt={movie.original_title}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to="/watchlist">
          <img
            src={playIcon}
            className="w-16 h-16 text-white fill-current cursor-pointer"
          />
        </Link>
      </div>
      <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <img
          src={heartIcon}
          alt="Heart Icon"
          className="w-5 h-5 ml-1 mr-1 cursor-pointer"
          onClick={() => handleAddToFavourite(movie.id, movie.original_title, movie.poster_path)}
        />
      </div>
      <div className="text-white text-center">
        <p className="cursor-pointer">{movie.original_title}</p>
      </div>
    </div>
  );
}

export default Moviepagecard