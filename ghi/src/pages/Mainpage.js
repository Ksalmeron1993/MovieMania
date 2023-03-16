import { useNavigate } from "react-router-dom";
import "../styles/Mainpage.css";

function Mainpage() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="text-center">
      <h1 className="display-5 fw-bold">Movie Mania</h1>
      </div>
      <div class="d-grid gap-4 mx-auto">
        <button
          type="button"
          class="btn btn-lg btn-color btn-hover"
          style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
          onClick={() => navigate("/signup")}
        >
          Become a Movie Maniac and Sign up!
        </button>
        <button
          type="button"
          class="btn btn-lg btn-color2 btn-hover2"
          style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
          onClick={() => navigate("/login")}
        >
          Already a Movie Maniac? Login!
        </button>

      </div>
    </div>
  );
}

export default Mainpage;

      // <button
      //     style={{ color: "goldenrod" }}
      //     className="link-btn"
      //     onClick={() => navigate("/signup")}
      //   >
      //     Become a Movie Maniac and Sign up!!
      //   </button>
      //   <button
      //     style={{ color: "goldenrod" }}
      //     className="link-btn2"
      //     onClick={() => navigate("/login")}
      //   >
      //     Already a Movie Maniac? Login!!
      //   </button>
