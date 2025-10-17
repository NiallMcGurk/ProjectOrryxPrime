import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface Army {
  id: number;
  name: string;
  faction: string;
  points: number;
  detachment: number;
}

function MyArmies() {
  const [armies, setArmies] = useState<Army[]>([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (!authUser?.Id) {
      return;
    } else {
      getModelsHandler(authUser.Id);
    }
  }, [authUser]);

  const getModelsHandler = async (accountId: number): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:51003/armyController/getArmies?accountId=" +
          accountId,
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
    <>
      {armies.length > 0 ? (
        armies.map((army) => (
          <div key={army.id} className="card border-0 shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title fw-semibold mb-1">{army.name}</h5>
                <div className="text-muted mb-1">{army.faction}</div>
                <small className="text-secondary">
                  Detachment: {army.detachment}
                </small>
              </div>
              <div className="text-end">
                <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
                  {army.points}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No armies found.</p>
      )}
    </>
  );
}

export default MyArmies;
