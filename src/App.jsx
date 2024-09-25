import { useState } from "react";
import "./App.css";
import FolderList from "./FolderList/FolderList";
import InputSearch from "./InputSearch/InputSearch";
import RadioBtnsSection from "./RadioBtnsSection/RadioBtnsSection";

function App() {
  const [userRole, setUserRole] = useState("User");

  console.log(userRole);

  const setRole = (role) => {
    setUserRole(role);
  };

  return (
    <div className="container">
      <h1>Folder App</h1>
      <RadioBtnsSection setRole={setRole} userRole={userRole} />
      <InputSearch />
      <FolderList userRole={userRole} />
    </div>
  );
}

export default App;
