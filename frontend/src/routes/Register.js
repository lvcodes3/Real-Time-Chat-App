import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("form submit");
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="header">
            <img src="" alt="" />
            <h1>Real Time Chat App</h1>
          </div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
  }
`;

export default Register;
