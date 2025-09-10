import "./HomePage.css";

function Homepage() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Project Orryx Prime</h1>
        <p className="lead">
          Forge your army. Command your faction. Dominate the battlefield.
        </p>
        <a href="/login" className="btn btn-create mt-4">
          Create Army
        </a>
      </div>
      <footer>
        &copy; 2025 Project Orryx Prime. Not affiliated with Games Workshop.
      </footer>
    </div>
  );
}
export default Homepage;
