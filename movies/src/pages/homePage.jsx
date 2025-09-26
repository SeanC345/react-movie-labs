import React from "react";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";

const HomePage = (props) => {
  const movies = props.movies;

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




