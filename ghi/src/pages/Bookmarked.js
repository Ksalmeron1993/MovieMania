import { useEffect, useState } from "react";
import { useAuthContext, useToken } from "./Authentication";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
//import "./PostList.css";

function Bookmarkedmovies() {
  const [bookmarks, setBookmarks] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const fetchData = async () => {
    const url = `http://localhost:8000/users/get/${token}`;
    console.log(token)
    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  //   const response = await fetch(url, fetchConfig);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setBookmarks(data);
  //     console.log(data)
  //   }
  // };

  const getBookmarks = async () => {
    const url = "http://localhost:8000/movies/bookmarks";
    const response = await fetch(url);
    if (response.ok) {
      const bookmark = await response.json();
      setBookmarks(bookmark);
      console.log(bookmark, "bookmark")
    }
  };
  console.log("bookmark", bookmarks)


  const handleRemoveBookmark = (movie) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark !== movie));
  };

  useEffect(() => {
  if (token === false) {
    navigate("/login");
    console.log("not logged in")
  } else {
    fetchData();
    getBookmarks();
  }
}, [token]);

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
