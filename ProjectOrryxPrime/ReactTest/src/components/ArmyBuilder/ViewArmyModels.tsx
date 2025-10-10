import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getModel } from "../../context/ModelContext";

function ViewArmyModels() {
  // TO-DO: Fetch all armies from backend using an array and mapping.
  const [modelDetails, setModelDetails] = useState({
    Id: 0,
    Name: "",
    FactionType: "",
    FactionRuleId: 0,
    StatsId: 0,
  });

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
    <form onLoad={getModelsHandler}>
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <label htmlFor="Model">Model</label>
            <input
              type="text"
              className="card-title"
              name="Name"
              value={modelDetails.Name}
              readOnly
            />
            <label htmlFor="FactionType">FactionType</label>
            <input
              type="text"
              className="card-title"
              name="FactionType"
              value={modelDetails.FactionType}
              readOnly
            />
            <a href="#" className="btn btn-primary">
              Add
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ViewArmyModels;
