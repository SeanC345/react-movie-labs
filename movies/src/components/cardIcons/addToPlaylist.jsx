import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { MoviesContext } from "../../contexts/moviesContext";
import Tooltip from "@mui/material/Tooltip";
import { add } from "lodash";

export default function AddToPlaylistIcon({ movie }) {
    const { mustWatch = [], addToMustWatch, removeFromMustWatch } = useContext(MoviesContext);
    const isInPlaylist = mustWatch.includes(movie.id);

    const toggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInPlaylist) removeFromMustWatch(movie);
        else addToMustWatch(movie);
    };

    return (
        <Tooltip title={isInPlaylist ? "In Must Watch" : "Add to Must Watch"}>
            <IconButton aria-label="add to playlist" onClick={toggle}>
                {isInPlaylist ? ( <PlaylistAddCheckIcon color="success"/>
                ) : (
                     <PlaylistAddIcon color="primary"/>
                )}
            </IconButton>
        </Tooltip>
    );
}
