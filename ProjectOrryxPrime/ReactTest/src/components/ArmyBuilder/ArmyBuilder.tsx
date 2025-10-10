import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ArmyBuilder() {
  const [armyDetails, setArmyDetails] = useState({
    armyName: "",
    faction: 0,
    points: 0,
    detachment: 0,
  });

  const getNewArmyDetails = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setArmyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const navigation = useNavigate();

  const createArmyHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:51003/armyController/createArmy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(armyDetails),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error");
      }
      alert("Army created successfully!");
      navigation("/myArmies");
    } catch (error) {
      alert(
        "An error occurred while creating the army. Please try again later."
      );
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-light">Warhammer Army Builder</h1>

      <form
        onSubmit={createArmyHandler}
        className="bg-secondary p-4 rounded text-light"
      >
        <div className="mb-3">
          <label htmlFor="armyName" className="form-label">
            Army Name
          </label>
          <input
            type="text"
            className="form-control"
            name="armyName"
            value={armyDetails.armyName}
            onChange={getNewArmyDetails}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="faction" className="form-label">
            Faction
          </label>
          <select
            className="form-select"
            name="faction"
            value={armyDetails.faction}
            onChange={getNewArmyDetails}
            required
          >
            <option value="">Select a faction</option>
            <option value="Space Marines">Space Marines</option>
            <option value="Orks">Orks</option>
            <option value="Tyranids">Tyranids</option>
            <option value="Eldar">Eldar</option>
            <option value="Necrons">Necrons</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="points" className="form-label">
            Point Size
          </label>
          <select
            className="form-select"
            name="points"
            value={armyDetails.points}
            onChange={getNewArmyDetails}
            required
          >
            <option value="">Select point size</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="detachment" className="form-label">
            Detachment
          </label>
          <select
            className="form-select"
            name="detachment"
            value={armyDetails.detachment}
            onChange={getNewArmyDetails}
            required
          >
            <option value="">Select detachment</option>
            <optgroup label="Ork Detachments">
              <option value="BullyBoyz">Bully Boyz</option>
              <option value="DaBigHunt">Da Big Hunt</option>
              <option value="DreadMob">Dread Mob</option>

              <option value="GreenTide">Green Tide</option>
              <option value="KultOfSpeed">Kult Of Speed</option>
              <option value="MoreDakka">More Dakka!</option>

              <option value="TaktikalBrigade">Taktikal Bridage</option>
              <option value="WarHorde">War Horde</option>
            </optgroup>

            <optgroup label="Other Detachments">
              <option value="10">Vanguard</option>
              <option value="11">Outrider</option>
              <option value="12">Spearhead</option>
            </optgroup>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Army
        </button>
      </form>
    </div>
  );
}

export default ArmyBuilder;
