import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


export default function FilterMoviesCard(props) {

    const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  };

  const handleMinRatingChange = (e) => {
    handleChange(e, "minRating", Number(e.target.value));
  };

  const handleYearChange = (e) => {
    handleChange(e, "year", e.target.value);
  };

   const controlSx = {
    mb: 2,
    width: "100%",
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: "8px",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    "& .MuiFilledInput-input": {
      color: "text.primary",
    },
    "& .MuiInputBase-input": {
      color: "text.primary",
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "primary.main",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "0 !important",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "0 !important",
    },
    "& .MuiSvgIcon-root": {
      color: "text.primary",
    },
  };


  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        boxShadow: "0 12px 24px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      
      <CardContent sx={{ pb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <SearchIcon sx={{ color: "primary.main" }} fontSize="large" />
          <Typography
            variant="h6"
            component="h1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            Filter & Sort
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.4 }}
        >
          Search by title, filter by genre / year / rating, sort the list.
        </Typography>
      </CardContent>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      
      <CardContent sx={{ pt: 2, pb: 2 }}>
       
        <TextField
          id="filled-search"
          label="Search title"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
          sx={controlSx}
          fullWidth
        />

        
        <FormControl variant="filled" sx={controlSx} fullWidth>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        
        <FormControl variant="filled" sx={controlSx} fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="Popularity">Popularity</MenuItem>
            <MenuItem value="Rating">Rating</MenuItem>
            <MenuItem value="Release Date">Release Date</MenuItem>
          </Select>
        </FormControl>

        
        <FormControl variant="filled" sx={controlSx} fullWidth>
          <InputLabel id="rating-label">Minimum Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={props.minRating}
            onChange={handleMinRatingChange}
          >
            <MenuItem value={0}>All Ratings</MenuItem>
            <MenuItem value={5}>5+</MenuItem>
            <MenuItem value={6}>6+</MenuItem>
            <MenuItem value={7}>7+</MenuItem>
            <MenuItem value={8}>8+</MenuItem>
          </Select>
        </FormControl>

        
        <FormControl variant="filled" sx={controlSx} fullWidth>
          <InputLabel id="year-label">Release Year</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={props.yearFilter}
            onChange={handleYearChange}
          >
            <MenuItem value={"All"}>All Years</MenuItem>
            <MenuItem value={"2020s"}>2020-2024</MenuItem>
            <MenuItem value={"2010s"}>2010-2019</MenuItem>
            <MenuItem value={"2000s"}>2000-2009</MenuItem>
            <MenuItem value={"1990s"}>1990-1999</MenuItem>
            <MenuItem value={"1980s"}>1980-1989</MenuItem>
            <MenuItem value={"1970s"}>1970-1979</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      <CardMedia
        sx={{
          height: 140,
          objectFit: "cover",
          opacity: 0.4,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
        image={img}
        title="Filter"
      />

      <CardContent sx={{ py: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
            textAlign: "center",
          }}
        >
        </Typography>
      </CardContent>
    </Card>
  );
}
