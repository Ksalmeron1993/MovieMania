import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";


function Bookmarkedmovies( props ) {
  const [bookmarks, setBookmarks] = useState([]);
  const {id} = useParams();
  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
    vote_average: 0,
    runtime: 0,
    genres: [],
  });
  const { token } = useAuthContext();
  const navigate = useNavigate();
  
  console.log("USERID" , id)
  console.log("TOKEN", token)

  const fetchData = useCallback(async() => {
    if(token?.user?.id){
    const url = `http://localhost:8000/users/get/${token.user.id}`;
    //const url = `http://localhost:8000/users/get/${id}`;
    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  }
  }, []);
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`http://localhost:8000/movies/${id}/detail`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovieDetails();
    console.log("MOVIE ID", id)

  }, [id]);

  const getBookmarks = useCallback(async() => {
    if(token?.user?.id){
    const url = `http://localhost:8000/bookmarks/get/all/${token.user.id}`;
    const response = await fetch(url);
    if (response.ok) {
      const bookmark = await response.json();
      setBookmarks(bookmark);
      console.log(bookmark, "BOOKMARK!!!!");
    }
  }
  }, [token, id]);

  const handleRemoveBookmark = async (movie) => {
    const url = `http://localhost:8000/bookmarks/delete/${movie.id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== movie.id));
    }
  };

 useEffect(() => {
  if (token === false) {
    navigate("/login");
    console.log("not logged in");
  } else {
    fetchData(token).then(() => {
      getBookmarks();
    });
  }
}, [token, id, navigate, fetchData, getBookmarks]);

  return (
    <div>
      <h1>Movie Bookmarks</h1>

      <div className="movies-container">
        {bookmarks.length > 0 ? (
          bookmarks.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
              <button onClick={() => handleRemoveBookmark(movie)}>
                Remove Bookmark
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarks yet!</p>
        )}
      </div>
    </div>
  );
}

export default Bookmarkedmovies;
