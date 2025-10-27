import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { set } from "lodash";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOption, setSortOption] = useState("Popularity");
  const [minRating, setMinRating] = useState(0);
  const [yearFilter, setYearFilter] = useState("All");

  const [page, setPage] = useState(1);
  const pageSize = 12;
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return minRating > 0 ? (m.vote_average || 0) >= minRating : true;
    })
    .filter((m) => {
      if (yearFilter === "All") return true;
      const year = m.release_date ? m.release_date.substring(0, 4) : "";
      if (year === "") return false;
      if (yearFilter === "2020s") {
        return year >= "2020" && year <= "2029";
      }
      if (yearFilter === "2010s") {
        return year >= "2010" && year <= "2019";
      }
      if (yearFilter === "2000s") {
        return year >= "2000" && year <= "2009";
      }
      if (yearFilter === "1990s") {
        return year >= "1990" && year <= "1999";
      }
      if (yearFilter === "1980s") {
        return year >= "1980" && year <= "1989";
      }
      if (yearFilter === "1970s") {
        return year >= "1970" && year <= "1979";
      }
      return true;
    });

    displayedMovies = displayedMovies.slice().sort((a, b) => {
      if (sortOption === "Rating") {
        return (b.vote_average || 0) - (a.vote_average || 0);
      }
      if (sortOption === "Release Date") {
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      }
      return (b.popularity || 0) - (a.popularity || 0);
    });

    const totalPages = Math.ceil(displayedMovies.length / pageSize);
    const pagedMovies = displayedMovies.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const handlePageChange = (event, value) => {
      setPage(value);
    };

  const handleChange = (type, value) => {
    setPage(1);
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "minRating") setMinRating(value);
    else if (type === "year") setYearFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortOption={sortOption}
            minRating={minRating}
            yearFilter={yearFilter}
          />
        </Grid>
          <MovieList movies={pagedMovies} action={action} />

          <Stack
          direction="row"
          justifyContent="center"
          sx={{ padding: "20px" }}
          >
          <Pagination
          count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Stack>
    </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
