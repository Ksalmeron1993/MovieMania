import React, { useState } from "react";
import { Link } from "react-router-dom";


function MovieCard3(props) {
  const [showOverview] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500/${props.movie.movie.poster_path}`;

  return (
    <div className="movie">
      <div>
        <Link to={`/movies/${props.movie.movie_id}/detail`}>
          <img src={imageUrl} alt={props.movie.title} />
        </Link>
      </div>
      <div>
        <h3>{props.movie.title}</h3>
        <h3>id {props.movie.id}</h3>

        {showOverview && <h4>{props.movie.overview}</h4>}
        <h5>{props.movie.adult}</h5>
      </div>
    </div>
  );
}

export default MovieCard3;
