import { add } from "lodash";
import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] );
    const [myReviews, setMyReviews] = useState( {} ) ;
    const [mustWatch, setMustWatch] = useState([]);


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

const addToMustWatch = (movie) => {
    setMustWatch((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
    console.log("Must Watch:", [...new Set([...mustWatch, movie.id])]); // confirm
  };

const removeFromMustWatch = (movie) => {
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
    console.log("Must Watch:", mustWatch.filter((id) => id !== movie.id)); // confirm
};

   return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
