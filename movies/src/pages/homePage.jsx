import React, { useState, useEffect } from "react";  
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";

const HomePage = (props) => {
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);


  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <h1>HomePage</h1>
      </Grid>

      
      <Grid item xs={12} container>
        <MovieList movies={movies} />
      </Grid>
    </Grid>
  );
};

export default HomePage;




