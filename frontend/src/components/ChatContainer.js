// dependencies
import styled from "styled-components";

const ChatContainer = ({ currentChat }) => {
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={currentChat.avatar_image}
              style={{ width: 75, height: 75 }}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages"></div>
      <div className="chat-input"></div>
    </Container>
  );
};

const Container = styled.div``;

export default ChatContainer;
