import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
// components
import Register from "./routes/Register";
import Login from "./routes/Login";
import Chat from "./routes/Chat";
import SetAvatar from "./routes/SetAvatar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/setAvatar" element={<SetAvatar />} />
        <Route exact path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
