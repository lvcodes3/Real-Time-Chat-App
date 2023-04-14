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

  // checking if user is logged in
  useEffect(() => {
    if (!localStorage.getItem("real-time-chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      // get user data from local storage
      const user = await JSON.parse(
        localStorage.getItem("real-time-chat-app-user")
      );

      // update in backend
      const data = await axios.post(`${setAvatarRoute}/${user.id}`, {
        image: avatars[selectedAvatar],
      });
      console.log(data);

      if (data.data.isSet) {
        // update user data in local storage
        user.is_avatar_image_set = data.data.isSet;
        user.avatar_image = data.data.image;
        localStorage.setItem("real-time-chat-app-user", JSON.stringify(user));
        // redirect
        // navigate("/");
      } else {
        toast.error("Error setting avatar, please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const urls = [];
    const getAvatars = async () => {
      for (let i = 0; i < 3; i++) {
        const url = `https://robohash.org/${Math.round(
          Math.random() * 100000
        )}.png`;
        urls.push(url);
      }
      setAvatars(urls);
      setIsLoading(false);
    };
    getAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submitBtn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};
export default SetAvatar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #12343b; /* night blue shadow */
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      cursor: pointer;
      border: 1px solid transparent;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        width: 180px;
        height: 180px;
      }
    }

    .selected {
      border: 1px solid #c89666; /* sand tan shadow */
    }
  }

  button {
    background-color: #c89666; /* sand tan shadow */
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #e1b382; /* sand tan */
      transition: 0.5s ease-in-out;
    }
  }
`;
