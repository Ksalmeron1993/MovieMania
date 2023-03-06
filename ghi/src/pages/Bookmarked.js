import { useEffect, useState } from "react";
import { useAuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

function Bookmarkedmovies({ user_id }) {
  const [bookmarks, setBookmarks] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate();
  
  console.log("USERID" , user_id)
  const fetchData = async () => {
    const url = `http://localhost:8000/users/get/${user_id}`;
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
    }
  };

  const getBookmarks = async () => {
    console.log("USERIDDDDDD", user_id);
    const url = `http://localhost:8000/movies/bookmarks/get/${user_id}`;
    const response = await fetch(url);
    if (response.ok) {
      const bookmark = await response.json();
      setBookmarks(bookmark);
      console.log(bookmark, "bookmark");
    }
  };

  const handleRemoveBookmark = (movie) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark !== movie));
  };

 useEffect(() => {
  if (token === false) {
    navigate("/login");
    console.log("not logged in");
  } else {
    fetchData().then(() => {
      getBookmarks();
    });
  }
}, [token, user_id, navigate, fetchData, getBookmarks]);

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
