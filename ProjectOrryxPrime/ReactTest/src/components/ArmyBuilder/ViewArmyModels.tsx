import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewArmyModels() {
  const [modelDetails, setModelDetails] = useState({
    Id: 0,
    Name: "",
    FactionType: "",
    FactionRuleId: 0,
    StatsId: 0,
  });

  const navigation = useNavigate();

  const getModelDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setModelDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const getModelsHandler = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:51003/modelController/getModels",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setModelDetails(result);
      }
    } catch (error) {
      alert("An error occurred while fetching models. Please try again later.");
    }
  };

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{modelDetails.Name}</h5>
          <p className="card-text">{modelDetails.FactionType}</p>
          <a href="#" className="btn btn-primary">
            Add
          </a>
        </div>
      </div>
    </div>
  );
}

export default ViewArmyModels;
function async() {
  throw new Error("Function not implemented.");
}
