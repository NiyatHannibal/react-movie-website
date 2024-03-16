import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourite from "./Pages/Favourite/Favourite";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import Movie from "./Pages/Movie/Movie";
import Search from "./Pages/Search/Search";
import TVSHOWS from "./Pages/TVSHOWS/TVSHOWS";
import LOGIN from "./Pages/LOGIN/LOGIN";
import Signup from "./Pages/Signup/Signup";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const selectbygenere = (genres) => {
    console.log(genres);
    const [firstElement] = genres;
    setSelectedGenre(firstElement);
  };

  return (
    <AuthContextProvider>
      <div className="">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route
            path="movies/:id"
            element={<Details selectedGenre={selectedGenre} />}
          />
          <Route path="/movie" element={<Movie />} />
          <Route
            path="/search"
            element={<Search onSelect={(movie1) => selectbygenere(movie1)} />}
          />
          <Route path="/tvshows" element={<TVSHOWS />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
