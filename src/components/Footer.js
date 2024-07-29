// src/components/Footer.js
import React from "react";
import logoWhite from "../images/Logo White.png";
import instagramIcon from "../images/Instagran.png";
import facebookIcon from "../images/Facebook.png";
import pinterestIcon from "../images/Pinterest.png";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r"
      style={{
        backgroundImage: "linear-gradient(90deg, #e31059, #f6744b, #e31059)",
        width: "100%",
      }}
    >
      <div className="flex justify-center sm:justify-start gap-20 p-8 pb-20 flex-wrap">
        <figure>
          <img src={logoWhite} className="h-14" alt="logo" />
        </figure>
        <ul className="text-white text-center sm:text-left">
          <li>
            <a href="#">Search</a>
          </li>
          <li>
            <a href="#">Back to the Top</a>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
        <div className="flex gap-3">
          <figure>
            <img src={instagramIcon} className="h-6" alt="Instagram" />
          </figure>
          <figure>
            <img src={facebookIcon} className="h-6" alt="Facebook" />
          </figure>
          <figure>
            <img src={pinterestIcon} className="h-6" alt="Pinterest" />
          </figure>
        </div>
      </div>
      <div className="text-center pb-5 text-sm text-white">
        <p>@2024 - MovieJournal.com</p>
      </div>
    </footer>
  );
};

export default Footer;
