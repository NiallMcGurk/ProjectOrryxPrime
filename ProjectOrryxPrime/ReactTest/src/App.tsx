import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import ViewAccount from "./components/ViewAccount";
import Homepage from "./components/Homepage/Homepage";
import ArmyBuilder from "./components/ArmyBuilder/ArmyBuilder";
import ViewArmyModels from "./components/ArmyBuilder/ViewArmyModels";
import MyArmies from "./components/ArmyBuilder/MyArmies";
import Logout from "./components/Logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/account" element={<ViewAccount />} />
      <Route path="/armyBuilder" element={<ArmyBuilder />} />
      <Route path="/viewArmyModels" element={<ViewArmyModels />} />
      <Route path="/myArmies" element={<MyArmies />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
