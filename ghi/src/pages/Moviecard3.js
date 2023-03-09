import React, { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard3(props) {
  const [showOverview] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500/${props.movie.movie.poster_path}`;
  console.log(props.movie);

  // const handleBookmark = () => {
  //   props.handleBookmark(props.movie.id);
  // }
  //      <button onClick={handleBookmark}>Bookmark Movie</button>

  return (
    <div className="movie">
      <div>{/* <p>{props.movie.release_date}</p> */}</div>
      <div>
        <Link to={`/movies/${props.movie.movie_id}/detail`}>
          <img src={imageUrl} alt={props.movie.title} />
        </Link>
      </div>
      <div>
        <h3>{props.movie.title}</h3>
        {/* <h3>Popularity {props.movie.popularity}</h3> */}
        <h3>id {props.movie.id}</h3>

        {showOverview && <h4>{props.movie.overview}</h4>}
        <h5>{props.movie.adult}</h5>
        {/* <h6>Rating: {props.movie.vote_average}/10</h6> */}

        {/* <h4>{props.movie.video}</h4> */}
      </div>
    </div>
  );
}

export default MovieCard3;
