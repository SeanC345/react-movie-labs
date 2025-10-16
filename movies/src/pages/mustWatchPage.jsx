import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";
import { get } from "lodash";

const MustWatchPage = () => {
    const { mustWatch: movieIds } = useContext(MoviesContext);

    const results = useQueries({
        queries: movieIds.map((id) => ({
            queryKey: ["movie", { id }],
            queryFn: getMovie,
            staleTime: 360000,
        })),
    });

    const loading = results.find((r) => r.isPending);
    const error = results.find((r) => r.isError);

    if (loading) return <Spinner />;
    if (error) return <h1>{error.message}</h1>;

    const movies = results.map((r) => r.data )
    .filter(Boolean)
    .map((m) => ({ ...m,
        genre_ids: m.genres?.map((g) => g.id) ?? [],
    }));

    return (
        <PageTemplate
            title="Must Watch"
            movies={movies}
            action={(movie) => (
                <>
                    <RemoveFromPlaylist movie={movie} />
                    <WriteReview movie={movie} />
                </>
            )}
        />
    );
};

export default MustWatchPage;
