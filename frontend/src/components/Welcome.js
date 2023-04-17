// dependencies
import styled from "styled-components";
// assets
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a contact to start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  img {
    height: 20rem;
  }

  span {
    background-color: #e1b382; /* sand tan */
  }
`;

export default Welcome;
