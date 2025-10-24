import { useEffect, useState } from "react";

interface Model {
  id: number;
  name: string;
}

function ViewArmyModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [count, setCount] = useState(0);

  const getModelsHandler = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:51003/modelController/getModels",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch armies");
      const result = await response.json();
      setModels([result]);
    } catch (error) {
      alert("An error occurred while fetching models.");
    }
  };

  useEffect(() => {
    getModelsHandler();
  }, []);

  return (
    <div className="container py-5">
      {models.length > 0 ? (
        models.map((model) => (
          <div key={model.id} className="card border-0 shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title fw-semibold mb-1">{model.name}</h5>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-light border"
                  onClick={() => setCount(count > 0 ? count - 1 : 0)}
                >
                  -
                </button>
                <span className="fw-semibold">{count}</span>
                <button
                  className="btn btn-light border"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted text-center mt-5">No models found.</p>
      )}
    </div>
  );
}

export default ViewArmyModels;
