// dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // to send requests to our backend API
import { ToastContainer, toast } from "react-toastify"; // using react-toastify to display pop up window message
import "react-toastify/dist/ReactToastify.css"; // required toastify css
import styled from "styled-components";
// routes
import { setAvatarRoute } from "../utils/APIRoutes";
// assets
import loader from "../assets/loader.gif";

const SetAvatar = () => {
  const multiAvatarAPI = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {};

  useEffect(() => {
    const data = [];
    const getAvatars = async () => {
      for (let i = 0; i < 3; i++) {
        const image = await axios.get(
          `${multiAvatarAPI}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    getAvatars();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">{}</div>
      </Container>
      <ToastContainer />
    </>
  );
};
export default SetAvatar;

const Container = styled.div``;
