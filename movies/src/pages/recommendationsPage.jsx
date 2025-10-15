import React from "react";
import { getRecommendedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const RecommendationsPage = () => {
  const { id } = useParams();  
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['recommendations', { id }],
    queryFn: getRecommendedMovies
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
      title="Recommended Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};
export default RecommendationsPage;