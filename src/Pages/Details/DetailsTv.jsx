import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./detail.css";

function DetailsTv({ selectedGenre }) {
  const { id } = useParams();
  const [movieRecomenddetail, setMovieRecomendDetails] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  console.log(selectedGenre);
  console.log(id);

  //   useEffect(() => {
  //     const options = {
  //       method: "GET",
  //       url: `https://api.themoviedb.org/3/movie/${id}`,
  //       params: { language: "en-US" },
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Y2VkNjk0NWE3ZTA5YjcyN2U0MDJhZWVhMjEyYTI5YiIsInN1YiI6IjY1ZWM2NjY2Mjg3MjNjMDE4NzNmZWM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4lWINe39ItoAJtB1NgKTsuc15gkrAXY6eGmLqBN36QU",
  //       },
  //     };

  //     axios
  //       .request(options)
  //       .then((response) => {
  //         console.log(response.data);
  //         setMovieDetails(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [id]);

  const apiKey = "8ced6945a7e09b727e402aeea212a29b";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
      .then((response) => {
        console.log(response.data);
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  }, [id]);

  useEffect(() => {
    const API_KEY = "8ced6945a7e09b727e402aeea212a29b";

    const fetchMoviesByGenre = async (selectedGenre) => {
      const url = `https://api.themoviedb.org/3/discover/movie`;
      const params = {
        api_key: API_KEY,
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
        with_genres: selectedGenre,
      };

      try {
        const response = await axios.get(url, { params });
        console.log(response.data.results);
        setMovieRecomendDetails(response.data.results.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMoviesByGenre(selectedGenre);
  }, [selectedGenre]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const renderrecommendmovies = () => {
    return (
      <>
        {movieRecomenddetail.map((recommend) => (
          <div
            key={recommend.toString()}
            className="recommend"
            // onClick={() => movierenderdetail(recommend.sources[0])}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${recommend.backdrop_path}`}
              alt=""
            />
            <h3>{recommend.original_title}</h3>
          </div>
        ))}
      </>
    );
  };

  const handlePlayClick = () => {
    if (movieDetails.sources.length > 0) {
      const firstSource = movieDetails.sources[0];
      window.open(firstSource.link, "_blank");
    }
  };

  const handlePlayClick1 = () => {
    if (movieDetails.youtube_trailer.length > 0) {
      const firstSource = movieDetails.youtube_trailer;
      window.open(firstSource, "_blank");
    }
  };

  return (
    <div className="detailscontainer">
      <div className="absolute bg-gradient-to-r from-black detail-shadow w-[95%] h-[500px]"></div>
      <div className="detailsposter">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
        />
      </div>
      <div className="top-[20%] absolute p-4 md:p-8 w-full">
        <h1 className="clustertitle">{movieDetails.title}</h1>
        <div className="contentsection">
          <h1 className="clustertitle1">{movieDetails.vote_average}</h1>
          <h1 className="clustertitle1">{movieDetails.release_date}</h1>
        </div>
        <div className="detailsbutton">
          <button onClick={handlePlayClick}>Play</button>
          <button onClick={handlePlayClick1}>Watch Trailer</button>
        </div>
      </div>
      <div className="detailscontent">
        {" "}
        <div className="detailscontentimage">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.original_title}
          />
        </div>
        <div className="detailscontentdecrip">
          {" "}
          <h1>{movieDetails.original_title}</h1>
          {/* <ul>
            {movieDetails.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
          </ul> */}
          <p>{movieDetails.overview}</p>
          <p>Release Date: {movieDetails.release_date}</p>
        </div>
      </div>
      <h1 className="h1casts">Recommended Movies</h1>
      <div className="detailsRecomend">{renderrecommendmovies()}</div>
    </div>
  );
}

export default DetailsTv;
