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
import Container from '@mui/material/Container';

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

    const movies = credits?.cast ?? [];
    
    return(
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm="auto">
              {profileUrl && (
                <Card sx={{ maxWidth: 220 }}>
              <CardMedia component="img" image={profileUrl} alt={person.name} />
            </Card>
          )}
        </Grid>
        <Grid item xs>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {person.name}
              </Typography>
              {person.known_for_department && (
                <Typography variant="subtitle1">
                  {person.known_for_department}
                </Typography>
              )}
              {person.place_of_birth && (
                <Typography variant="body2">
                  From: {person.place_of_birth}
                </Typography>
              )}
              {person.birthday && (
                <Typography variant="body2">Born: {person.birthday}</Typography>
              )}
              {person.deathday && (
                <Typography variant="body2">Died: {person.deathday}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
     <PageTemplate
        title="Filmography"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    </Container>
  );
};

export default PersonPage;