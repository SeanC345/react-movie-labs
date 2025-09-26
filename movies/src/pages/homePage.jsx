import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/movieCard";

const HomePage = (props) => {
  const movies = props.movies;

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12}>
        <h1>HomePage</h1>
      </Grid>

      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <MovieCard movie={movies[0]} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;


