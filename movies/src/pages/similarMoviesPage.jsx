import React from "react";
import { getSimilarMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const SimilarMoviesPage = () => {
  const { id } = useParams();  
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['similarMovies', { id }],
    queryFn: getSimilarMovies
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const movies = data?.results ?? [];

  return (
    <PageTemplate
      title="Similar Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};
export default SimilarMoviesPage;