import { useState } from "react";
import Form from "./components/form";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <>
      <div className="user-container">Users</div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.first_name} {user.email}
          </li>
        ))}
      </ul>
      <div>Form</div>
      <Form addUser={addUser} />
    </>
  );
}

export default App;
