import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
// components
import Register from "./routes/Register";
import Login from "./routes/Login";
import Chat from "./routes/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
