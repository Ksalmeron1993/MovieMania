import { useNavigate } from "react-router-dom";
// this is the page to the sign up + login forms

function Mainpage() {
  const navigate = useNavigate();
  return (
    // image & sign up and login buttons
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
