import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";

function Homepage() {
  const { authUser, isLoggedIn } = useAuth();

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Project Orryx Prime</h1>
        {isLoggedIn && (
          <p className="welcome-msg">Hello {authUser?.Username}!</p>
        )}
        <p className="lead">
          Forge your army. Command your faction. Dominate the battlefield.
        </p>

        <a href="/armyBuilder" className="btn btn-create mt-4">
          Create Army
        </a>
        <Link
          to={isLoggedIn ? "/account" : "/login"}
          className="btn btn-factions mt-4"
        >
          {isLoggedIn ? "View Account" : "Login / Create Account"}
        </Link>
      </div>

      <footer>
        &copy; 2025 Project Orryx Prime. Not affiliated with Games Workshop.
      </footer>
    </div>
  );
}
export default Homepage;
