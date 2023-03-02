// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthContext } from "./Authentication";
// import { Container } from "react-bootstrap";

// function AllBookmarked() {
//   const { isLoggedIn } = useAuthContext();
//   const navigate = useNavigate();
//   const[movies, setMovies] = useState([]);


//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login"); // Redirect to login page if user is not logged in
//     }
//   }, [isLoggedIn, navigate]);

// const deleteSavedMovies = async (movieId) => {
//         try {
//             const deletedMovie = movies.filter((i) => i.id !== movieId);
//             await updateDoc(movieRef, {
//                 savedMovies: deletedMovie
//             });
//         } catch (err) {
//             console.log(err);a
//         }
//     };

// //
// return (
//     isLoggedIn (
//         <>
//             {movies.map((bookmarked, id) => {
//                 return (
//                     <div className='bookmarked--movie--container'>
//                                             {/* HERE WILL GO OUR 3RD PARTY API URL */}
//                         <img key={id} src={`https://api.themoviedb.org/3/search/movie?api_key=7d055fdafcdf398aab55d81760d1c151&query=/${bookmarked?.img}`} alt={bookmarked.title} />

//                         <div className='bookmarked--movie--btn'>

//                             <FaInfoCircle title='More Info' onClick={() => navigate(`/movie/${bookmarked?.id}`)} />
//                             {/* DELETE BY MOVIE_ID */}
//                             <FaRegFrown
//                                 onClick={() => deleteBookmarked(bookmarked.id)}
//                                 title='Remove'
//                             />

//                         </div>

//                     </div>
//                 )

//             })}
//         </>
//     )
// );
//         }

// // API_URL = "https://api.themoviedb.org/3/search/movie?api_key=7d055fdafcdf398aab55d81760d1c151&query="



// //   return (
// //     <Container>
// //       {isLoggedIn (
// //         <>
// //           <h1>All Bookmarked Movies</h1>
// //           <p>Click on a movie to see details:</p>
// //           <Link to="/moviedetail">Movie 1</Link>
// //           <Link to="/moviedetail">Movie 2</Link>
// //           <Link to={`/moviedetail/${movie.id}`}>{movie.title}</Link>
// //         </>
// //       )}
// //     </Container>
// //   );
// // }
// export default AllBookmarked;
