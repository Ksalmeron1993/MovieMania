import { useNavigate } from "react-router-dom";
import "../styles/Mainpage.css";

function Mainpage() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Movie Mania</h1>
      <div class="d-grid gap-2">
        <button
          type="button"
          class="btn btn-outline-warning"
          
          onClick={() => navigate("/signup")}
        >
          Become a Movie Maniac and Sign up!
        </button>
        <button
          type="button"
          class="btn btn-outline-success"
          onClick={() => navigate("/login")}
        >
          Already a Movie Maniac? Login!
        </button>
        {/* <button
          style={{ color: "goldenrod" }}
          className="link-btn"
          onClick={() => navigate("/signup")}
        >
          Become a Movie Maniac and Sign up!!
        </button>
        <button
          style={{ color: "goldenrod" }}
          className="link-btn2"
          onClick={() => navigate("/login")}
        >
          Already a Movie Maniac? Login!!
        </button> */}
      </div>
    </div>
  );
}

export default Mainpage;
