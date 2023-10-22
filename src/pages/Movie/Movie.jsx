import { Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import { Carousel } from "react-responsive-carousel";

const Movie = () => {
  const { id } = useParams();
  const [currentMovieDetail, setMovie] = useState();

  const getMoviedata = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=&language=en-US`
    );
    const data = await response.json();
    setMovie(data);
  };
  useEffect(() => {
    getMoviedata();
    getTrailer();
  }, []);

  const [trailers, setTrailers] = useState([]);
  const getTrailer = async () => {
    const response = await fetch(
      `http://api.themoviedb.org/3/movie/${id}/videos?api_key=`
    );
    const payload = await response.json();
    console.log(payload);
    const trailers = payload.results.filter(
      (video) => video.type === "Trailer"
    );
    setTrailers(trailers);
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <Star />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="video_carousel">
        <h2>Trailes</h2>
        <Carousel>
          {trailers &&
            trailers.map((video) => (
              <div key={video.key}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameborder="0"
                  title="Trailer"
                  allowFullScreen
                  width={550}
                  height={315}
                ></iframe>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Movie;
