// dependencies
import styled from "styled-components";
import axios from "axios";
// components
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
// API Route
import { sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser.id,
      to: currentChat.id,
      message: msg,
    });
  };

  return (
    <>
      {currentChat && (
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
            <Logout />
          </div>
          <Messages />
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;

export default ChatContainer;
