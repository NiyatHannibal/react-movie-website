import React, { useEffect, useState, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const screenWidth = window.innerWidth;

function Slider() {
  const [movies, setMovies] = useState([]);
  const elementRef = useRef();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=fdeff6c8dc7c398d53999b4c61dee22d"
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const sliderRight = () => {
    elementRef.current.scrollLeft += screenWidth;
  };

  const sliderLeft = () => {
    elementRef.current.scrollLeft -= screenWidth;
  };

  return (
    <div style={{ width: `${screenWidth}px` }}>
      <HiChevronLeft
        className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer "
        onClick={sliderLeft}
      />
      <HiChevronRight
        className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer right-0"
        onClick={sliderRight}
      />

      <div
        className="flex overflow-x-auto w-full h-[490px] px-16 py-150 scrollbar-none scroll-smooth"
        ref={elementRef}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", height: "auto" }}
            className="object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-400 transition-all duration-100 ease-in"
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;

