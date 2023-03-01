import react from "react";


function MovieCard ( props ) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`;

  return (
    <div className="movie">
      {props.movie.id}
      <div>
        <p>{props.movie.release_date}</p>
      </div>
      <div>
        <img
          src={imageUrl}
          // alt={props.movie.title}
        />
      </div>
      <div>
        <h3>{props.movie.title}</h3>
        <h4>{props.movie.overview}</h4>
        <h5>{props.movie.adult}</h5>
        <h6>{props.movie.vote_average}</h6>
        <h4>{props.movie.vote_count}</h4>
        <h4>{props.movie.video}</h4>
      </div>
    </div>
  );
};
export default MovieCard;


// adult, vote_average, vote_count, video
