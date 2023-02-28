// import react from 'react';


// const MovieCard = ({movie}) => {
//     return (
//         <div className ='movie'>
//             <div>
//                 <p>{movie.Year}</p>
//             </div>
//             <div>
//                 <img src={movie.Poster !== 'N/A'? movie.Poster: "https://via.placeholder.com/400" } alt = {movie.Title} />
//             </div>
//             <div>
//                 <span>{movie.Type}</span>
//                 <h3>{movie.Title}</h3>

//             </div>
//     </div>


//     )

// }
// export default MovieCard;

import React from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movie }) => {
  const { title, poster_path, vote_average, release_date } = movie;

  return (
    <div className='movie-card'>
      <div className='movie-poster'>
        {poster_path ? (
          <img src={IMAGE_BASE_URL + poster_path} alt={title} />
        ) : (
          <div className='no-image'>{title}</div>
        )}
      </div>
      <div className='movie-info'>
        <h3>{title}</h3>
        <span>Release date: {release_date}</span>
        <span>Rating: {vote_average}</span>
      </div>
    </div>
  );
};

export default MovieCard;
