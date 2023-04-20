// dependencies
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #2d545e; /* night blue */
  border: none;
  cursor: pointer;
  svg {
    color: white;
    font-size: 1.3rem;
  }
`;

export default Logout;
