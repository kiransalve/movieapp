import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import MovieList from "./component/MovieList/MovieList";
import Header from "./component/Header/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="/*" element={<h1>Error Pages</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
