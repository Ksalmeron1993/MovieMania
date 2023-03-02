import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "./Authentication";
import { Container } from "react-bootstrap";

function AllBookmarked() {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container>
      {isLoggedIn (
        <>
          <h1>All Bookmarked Movies</h1>
          <p>Click on a movie to see details:</p>
          <Link to="/moviedetail">Movie 1</Link>
          <Link to="/moviedetail">Movie 2</Link>
          <Link to={`/moviedetail/${movie.id}`}>{movie.title}</Link>
        </>
      )}
    </Container>
  );
}


return
    {isLoggedIn (
        <>
            {movies.map((item, id) => {
                return (
                    <div className='saved--movie--container'>
                                            {/* HERE WILL GO OUR 3RD PARTY API URL */}
                        <img key={id} src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item.title} />

                        <div className='saved--movie--btn'>

                            <FaInfoCircle title='More Info' onClick={() => navigate(`/movie/${item?.id}`)} />
                            {/* DO WE DELETE BY ID OR MOVIE_ID */}
                            <FaRegFrown
                                onClick={() => deleteBookmarked(item.id)}
                                title='Remove'
                            />

                        </div>

                    </div>
                )

            })}
        </>
    )
};
export default AllBookmarked;
