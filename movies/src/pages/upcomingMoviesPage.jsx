import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

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

  const AddToPlaylist = ({ movie }) => {
    const { addToMustWatch } = useContext(MoviesContext);
    return (
      <IconButton aria-label="add to playlist" onClick={() => addToMustWatch(movie)}>
        <PlaylistAddIcon />
      </IconButton>
    );
  };
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
}

export default upcomingMovies;


