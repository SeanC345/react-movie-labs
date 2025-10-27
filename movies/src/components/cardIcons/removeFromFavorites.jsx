import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavoritesIcon = ({ movie, showSnack }) => {
  const {removeFromFavorites} = useContext(MoviesContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();

    removeFromFavorites(movie);

    if (showSnack) {
      showSnack("Removed from Favorites");
    }

  };
  return (
      <IconButton
        aria-label="remove from favorites"
        onClick={handleRemoveFromFavorites}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
