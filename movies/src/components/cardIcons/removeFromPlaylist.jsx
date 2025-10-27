import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { MoviesContext } from "../../contexts/moviesContext";

export default function RemoveFromPlaylist({ movie, showSnack }) {
    const { removeFromMustWatch } = useContext(MoviesContext);

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();

        removeFromMustWatch(movie);

        if (showSnack) {
            showSnack("Removed from Playlist");
        }
    };
    return (
        <IconButton aria-label="remove from playlist"
         onClick={handleRemove}
         >
            <PlaylistRemoveIcon color="primary"/>
        </IconButton>
    );
}
