import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import TrendingPage from "./pages/trendingPage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './themes/theme';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMovies from "./pages/popularMoviesPage";
import TopRatedMovies from "./pages/topRatedPage";
import NowPlayingMovies from "./pages/nowPlayingPage";  
import RecommendationsPage from "./pages/recommendationsPage";
import SimilarMoviesPage from "./pages/similarMoviesPage";
import PersonPage from "./pages/personPage";
import MustWatchPage from "./pages/mustWatchPage";




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});




const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/movies/trending/today" element={<TrendingPage />} />
          <Route path="/movies/popular" element={<PopularMovies />} />
          <Route path="/movies/top-rated" element={<TopRatedMovies />} />
          <Route path="/movies/now-playing" element={<NowPlayingMovies />} />
          <Route path="/movies/:id/recommendations" element={<RecommendationsPage />} />
          <Route path="/movies/:id/similar" element={<SimilarMoviesPage />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/movies/must-watch" element={<MustWatchPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
