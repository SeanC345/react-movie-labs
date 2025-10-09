import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";

const upcomingMovies = () => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;


  return (
  <PageTemplate
    title="Upcoming Movies"
    movies={movies}
    action={(movie) => (
      <IconButton aria-label="add to playlist">
        <PlaylistAddIcon />
      </IconButton>
    )}
  />
  );
}

export default upcomingMovies;
