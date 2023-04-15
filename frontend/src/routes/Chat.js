// dependencies
import styled from "styled-components";

const Chat = () => {
  return (
    <>
      <Container>
        <div className="container"></div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #12343b; /* night blue shadow */

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #2d545e; /* night blue */
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
