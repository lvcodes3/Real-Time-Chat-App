// dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // to send requests to our backend API
import { ToastContainer, toast } from "react-toastify"; // using react-toastify to display pop up window message
import "react-toastify/dist/ReactToastify.css"; // required toastify css
import styled from "styled-components";
// routes
import { loginRoute } from "../utils/APIRoutes";
// assets
import Logo from "../assets/message.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInputDataValidation = () => {
    // 1. check if username is of length 0
    if (username.length === 0) {
      toast.error("Username is required.", toastOptions);
      return false;
    }
    // 2. check if password is of length 0
    else if (password.length === 0) {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    // 1. prevent screen refresh
    e.preventDefault();

    // 2. check if input data is valid
    if (handleInputDataValidation()) {
      // process input data using axios to backend API
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      // 1. check if there was an error in the backend API
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      // 2. if no error in the backend API set localstorage key value
      if (data.status === true) {
        localStorage.setItem(
          "real-time-chat-app-user",
          JSON.stringify(data.data)
        );
        // navigate to chat room
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="header">
            <img src={Logo} alt="Message Logo" />
            <h1>Real Time Chat App</h1>
          </div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={20}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

// styled components css styling //
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #12343b; /* night blue shadow */

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #c89666; /* sand tan shadow */
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 1px solid black;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
    }
    input::-webkit-input-placeholder {
      color: black;
    }
    input:-moz-placeholder {
      color: black;
    }

    button {
      background-color: #12343b; /* night blue shadow */
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #2d545e; /* night blue */
        transition: 0.5s ease-in-out;
      }
    }

    span {
      text-transform: uppercase;
      a {
        color: black;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
