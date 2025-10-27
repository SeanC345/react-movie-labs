import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { MoviesContext } from "../../contexts/moviesContext";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";



export default function AddToPlaylistIcon({ movie }) {
    const { mustWatch = [], addToMustWatch, removeFromMustWatch } = useContext(MoviesContext);
    const isInPlaylist = mustWatch.includes(movie.id);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInPlaylist){
             removeFromMustWatch(movie);
             setSnackMessage("Removed from Playlist");
        } else{
             addToMustWatch(movie);
             setSnackMessage("Added to Playlist");
        }
        setOpenSnack(true);
    };

    return (
    <div>
      <Tooltip title={isInPlaylist ? "In Must Watch" : "Add to Must Watch"} arrow>
        <IconButton aria-label="add to playlist" onClick={handleClick}>
          {isInPlaylist ? <PlaylistAddCheckIcon color="success" /> : <PlaylistAddIcon color="primary" />}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        message={snackMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
