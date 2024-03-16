import React, { useEffect, useState } from "react";
import Slider from "./Slider";

import GenreMovieList from "./GenreMovieList";
 function Home() {
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {
    try {
      await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=9a74db84a98e27257a0f5b7f83b21e02"
      )
        .then((res) => res.json())
        .then((json) => setMovie(json.results));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <Slider />

      <GenreMovieList />
      
    </div>
  );
};

export default Home