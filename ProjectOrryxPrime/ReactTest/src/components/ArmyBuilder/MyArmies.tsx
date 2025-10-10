import { useEffect, useState } from "react";

interface armies {
  id: number;
  name: string;
  faction: string;
  points: number;
  detachment: number;
}

function MyArmies() {
  const [armies, setArmies] = useState<armies>();

  useEffect(() => {
    getModelsHandler();
  }, []);

  const getModelsHandler = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:51003/armyController/getArmies",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch armies");
      const result = await response.json();
      setArmies(result);
    } catch (error) {
      alert("An error occurred while fetching armies. Please try again later.");
    }
  };

  return (
    armies && (
      <div key={armies.id} className="card border-0 shadow-sm mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title fw-semibold mb-1">{armies.name}</h5>
            <div className="text-muted mb-1">{armies.faction}</div>
            <small className="text-secondary">
              Detachment: {armies.detachment}
            </small>
          </div>
          <div className="text-end">
            <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
              {armies.points}
            </span>
          </div>
        </div>
      </div>
    )
  );
}

export default MyArmies;
