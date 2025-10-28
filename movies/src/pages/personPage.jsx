import React from "react";
import { useParams } from "react-router-dom";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const PersonPage = () => {
    const { id } = useParams();

    const{
    data: person,
    isPending: pPending,
    isError: pIsError,
    error: pError
    } = useQuery({
        queryKey: ['person', { id }],
        queryFn: getPerson,
    });

    const {
    data: credits,
    isPending: cPending,
    isError: cIsError,
    error: cError
    } = useQuery({
        queryKey: ['person-credits', { id }],
        queryFn: getPersonMovieCredits,
    });

    if (pPending || cPending) return <Spinner />;
    if (pIsError) return <h1>{pError.message}</h1>;
    if (cIsError) return <h1>{cError.message}</h1>;

    const profileUrl = person.profile_path ? 
    `https://image.tmdb.org/t/p/w500${person.profile_path}`
     : null;

    const movies = credits.cast || [];
    
    return(
      <>
        <Box
      sx={{
        px: 2,
        pt: 2,
        pb: 3,
        bgcolor: "background.default",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
      >
       
        <Grid item xs={12} sm={4} md={3} lg={2.5}>
          {profileUrl && (
            <Card
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 6,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={profileUrl}
                alt={person.name}
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            </Card>
          )}
        </Grid>

        
        <Grid item xs={12} sm={8} md={9} lg={6}>
          <Card
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 6,
              color: "text.primary",
              minWidth: 0,
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "text.primary", fontWeight: 600, lineHeight: 1.3 }}
              >
                {person.name}
              </Typography>

              {person.known_for_department && (
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {person.known_for_department}
                </Typography>
              )}

              {person.place_of_birth && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  From: {person.place_of_birth}
                </Typography>
              )}

              {person.birthday && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  Born: {person.birthday}
                </Typography>
              )}

              {person.deathday && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  Died: {person.deathday}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
     <PageTemplate
        title="Filmography"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} showSnackbar={true} />} />
    </>
  );
};

export default PersonPage;