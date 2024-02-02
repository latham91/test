import "../styles/Home.css";
import { FaPaw } from "react-icons/fa";
import bannerImage from "../assets/onlycats_banner.jpg";

const Home = () => {
  return (
    <div className="home-page">
      {}
      <div className="content-container">
        {}
        <div className="banner-container">
          <img
            src={bannerImage}
            alt="OnlyCats Banner"
            className="banner-image"
          />
        </div>
        <div className="slogan-container">
          <p className="slogan">WELCOME TO ONLYCATS!</p>
        </div>
        <div className="text-container">
          <div className="text-box">
            <p className="editable-text">
              The purrrrfect choice for all your feline fetishes. No request is
              too big for our cats. Complete your request and pay the feline
              fee. Please login below so you can interact with your favourite
              cats. We hope you have a Purrrrrfect Day!
            </p>
          </div>
        </div>
        <div className="login-container">
          <div className="input-container">
            <div className="paw-icon">
              <FaPaw size={24} color="#01b1ef" />
            </div>
            <input type="text" placeholder="Email" />
          </div>
          <div className="input-container">
            <div className="paw-icon">
              <FaPaw size={24} color="#01b1ef" />
            </div>
            <input type="password" placeholder="Password" />
          </div>
          <button className="login-button">LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
