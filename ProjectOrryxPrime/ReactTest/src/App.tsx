import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to the Warhammer App</h1>} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/createAccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
