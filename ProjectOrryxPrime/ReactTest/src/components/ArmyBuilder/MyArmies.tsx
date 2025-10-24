import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser?.Id) {
      return;
    } else {
      getModelsHandler(authUser.Id);
    }
  }, [authUser]);

  const getModelsHandler = async (accountId: number): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:51003/armyController/getArmies?accountId=" +
          accountId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch armies");
      const result = await response.json();
      setArmies(result);
    } catch (error) {
      alert("An error occurred while fetching armies.");
    }
  };

  const handleArmyClick = (army: Army) => {
    navigate("/viewArmyModels/" + army.id, {
      state: { faction: army.faction },
    });
  };

  return (
    <>
      {armies.length > 0 ? (
        armies.map((army) => (
          <div
            key={army.id}
            className="card border-0 shadow-sm mb-3"
            role="button"
            onClick={() => handleArmyClick(army)}
          >
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
