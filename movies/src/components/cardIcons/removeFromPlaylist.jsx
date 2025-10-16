import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { MoviesContext } from "../../contexts/moviesContext";

export default function RemoveFromPlaylist({ movie }) {
    const { removeFromMustWatch } = useContext(MoviesContext);
    return (
        <IconButton aria-label="remove from playlist" onClick={() => removeFromMustWatch(movie)}>
            <PlaylistRemoveIcon color="primary"/>
        </IconButton>
    );
}
