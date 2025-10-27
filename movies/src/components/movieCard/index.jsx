import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';


export default function MovieCard({ movie, action }) {
      const { favorites, addToFavorites, mustWatch = [] } = useContext(MoviesContext);
  


  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const inPlaylist = mustWatch.includes(movie.id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };




  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={
        movie.favorite ? (
        <Avatar sx={{ backgroundColor: 'red' }}>
        <FavoriteIcon />
        </Avatar>
        ) : null
        }
        action={
          inPlaylist ? <PlaylistAddCheckIcon color="success"/> : null
        }
        title={
        <Typography variant="h5" component="p">
        {movie.title}{" "}
        </Typography>
        }
      />

      <CardMedia
        sx={{ 
          height: 500,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          objectFit: "cover"
         }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p" sx={{ fontWeight: 500 }}>
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p" sx={{ fontWeight: 500 }}>
              <StarRateIcon fontSize="small" /> {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: 2,
          paddingBottom: 2,
        }}
      >
        {action(movie)}
      
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}

