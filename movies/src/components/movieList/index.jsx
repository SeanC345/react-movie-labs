import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  let movieCards = props.movies.map((m) => (
    <Grid
      item
      key={m.id}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{ padding: "20px" }}
    >
      <Movie movie={m} />
    </Grid>
  ));

  return <>{movieCards}</>;
};

export default MovieList;
