// dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
// routes
import { allUsersRoute } from "../utils/APIRoutes";
// components
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  // checking if user is logged in
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!localStorage.getItem("real-time-chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("real-time-chat-app-user"))
        );
        setIsLoaded(true);
      }
    };
    checkUserStatus();
  }, [navigate]);

  // get all contacts from backend API
  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        if (currentUser.is_avatar_image_set) {
          const response = await axios.get(
            `${allUsersRoute}/${currentUser.id}`
          );
          setContacts(response.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
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
    height: 90vh;
    width: 90vw;
    background-color: #2d545e; /* night blue */
    display: grid;
    grid-template-columns: 30% 70%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
