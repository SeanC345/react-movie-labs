import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  
const [drawerOpen, setDrawerOpen] = useState(false);

const revenueLabel = 
  movie.revenue !== undefined && movie.revenue !== null
    ? `Revenue: $${movie.revenue.toLocaleString()}`
    : "Revenue: N/A";

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
        Overview
      </Typography>

      <Typography variant="h6" component="p" sx={{ marginBottom: 2 }}>
        {movie.overview}
      </Typography>

      <Paper
        component="ul"
        sx={{
          ...root,
          mb: 2,
          backgroundColor: "#1e293b",
          color: "white",
          borderRadius: 2,
        }}
      >
        <li>
          <Chip
            label="Genres"
            sx={{
              ...chip,
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              "& .MuiChip-icon": { color: "#fff" },
            }}
          />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip
              label={g.name}
              sx={{
                ...chip,
                backgroundColor: "#0f172a",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
              }}
            />
          </li>
        ))}
      </Paper>
      <Paper
        component="ul"
        sx={{
          ...root,
          mb: 2,
          backgroundColor: "#1e293b",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Chip
          icon={<AccessTimeIcon sx={{ color: "#fff" }} />}
          label={`${movie.runtime} min.`}
          sx={{
            ...chip,
            backgroundColor: "#0f172a",
            color: "#fff",
            "& .MuiChip-icon": { color: "#fff" },
          }}
        />

        <Chip
          icon={<MonetizationIcon sx={{ color: "#fff" }} />}
          label={revenueLabel}
          sx={{
            ...chip,
            backgroundColor: "#0f172a",
            color: "#fff",
            "& .MuiChip-icon": { color: "#fff" },
          }}
        />

        <Chip
          icon={<StarRate sx={{ color: "#fff" }} />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={{
            ...chip,
            backgroundColor: "#0f172a",
            color: "#fff",
            "& .MuiChip-icon": { color: "#fff" },
          }}
        />

        <Chip
          icon={<LanguageIcon sx={{ color: "#fff" }} />}
          label={`Original Language: ${movie.original_language}`}
          sx={{
            ...chip,
            backgroundColor: "#0f172a",
            color: "#fff",
            "& .MuiChip-icon": { color: "#fff" },
          }}
        />

        <Chip
          label={`Released: ${movie.release_date}`}
          sx={{
            ...chip,
            backgroundColor: "#0f172a",
            color: "#fff",
            "& .MuiChip-icon": { color: "#fff" },
          }}
        />
      </Paper>
      <Paper
        component="ul"
        sx={{
          ...root,
          mb: 2,
          backgroundColor: "#1e293b",
          color: "white",
          borderRadius: 2,
        }}
      >
        <li>
          <Chip
            label="Production Countries"
            sx={{
              ...chip,
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              "& .MuiChip-icon": { color: "#fff" },
            }}
          />
        </li>
        {movie.production_countries?.map((c) => (
          <li key={c.iso_3166_1 || c.name}>
            <Chip
              label={c.name}
              sx={{
                ...chip,
                backgroundColor: "#0f172a",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
              }}
            />
          </li>
        ))}
      </Paper>
       <Paper
        component="ul"
        sx={{
          ...root,
          mb: 2,
          backgroundColor: "#1e293b",
          color: "white",
          borderRadius: 2,
        }}
      >
        <li>
          <Chip
            label="Cast"
            sx={{
              ...chip,
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              "& .MuiChip-icon": { color: "#fff" },
            }}
          />
        </li>

        {(movie.credits?.cast ?? []).slice(0, 6).map((c) => (
          <li key={c.cast_id || c.credit_id || c.id}>
            <Chip
              label={c.name}
              component={RouterLink}
              to={`/person/${c.id}`}
              clickable
              sx={{
                ...chip,
                backgroundColor: "#0f172a",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
              }}
            />
          </li>
        ))}
      </Paper>
       <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 6 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/movies/${movie.id}/recommendations`}
        >
          Recommendations
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/movies/${movie.id}/similar`}
        >
          Similar Movies
        </Button>
      </Stack>
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
};
export default MovieDetails ;
