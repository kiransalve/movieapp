import { Carousel } from "react-responsive-carousel";
import React from "react";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Star } from "@mui/icons-material";
import "./Home.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=&language=en-US"
      );
      const data = await response.json();
      setPopularMovies(data.results);
    };
    getMovie();
  }, []);
  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={4}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
      >
        {popularMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div className="posterImage" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage_title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage__runtime">
                {movie ? movie.release_date : ""}
                <span className="posterImage__rating">
                  {movie ? movie.vote_average : ""}
                  <Star />{" "}
                </span>
              </div>
              <div className="posterImage__Description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
