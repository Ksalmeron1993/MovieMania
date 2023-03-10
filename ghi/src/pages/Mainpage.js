import { useNavigate } from "react-router-dom";

function Mainpage() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Movie Mania</h1>
      <div>
        <button
          style={{ color: "goldenrod" }}
          className="link-btn"
          onClick={() => navigate("/signup")}
        >
          Become a Movie Maniac and Sign up!!
        </button>
      </div>
      <div>
        <button
          style={{ color: "goldenrod" }}
          className="link-btn"
          onClick={() => navigate("/login")}
        >
          Already a Movie Maniac? Login!!
        </button>
      </div>
    </div>
  );
}
export default Mainpage;
