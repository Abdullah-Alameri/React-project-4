import React from "react";
import {  Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';




const Header = () => {
  const { t, i18n } = useTranslation();



  const [ user ] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">

      <header className="hide-when-mobile ali ">
        <h1>
    
          <Link to="/"> My Tasks </Link>
        </h1>
        {/* <button
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="theme-btn"
        >
          {theme}
        </button> */}



        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>



        <ul className="flex">
          <li className="main-list lang">
            {t("lang")}

            <ul className="lang-box">
              <li onClick={() => {
                i18n.changeLanguage("ar")
              }} style={{justifyContent: "space-between"}} className="flex" dir="rtl">
                <p>العربية</p>
                {i18n.language === "ar" && (<i className="fa-solid fa-check"></i>)  }
                </li>
              <li onClick={(eo) => {
                i18n.changeLanguage("en")
              }}>
                <p>English</p>
                {i18n.language === "en"  && (<i className="fa-solid fa-check"></i>)  }
                </li>
              <li onClick={(eo) => {
                i18n.changeLanguage("fr")
              }}>
                <p>French</p>
                {i18n.language === "fr"  && (<i className="fa-solid fa-check"></i>)  }
                </li>
            </ul>
          </li>



          {!user && <li className="main-list">
            <NavLink className="main-link" to="/signin">
            {t("signin")}
            </NavLink>

          </li>}



          {!user && <li className="main-list">
            <NavLink className="main-link" to="/signup">
              {t("signup")}
            </NavLink>

          </li>}





          {user && <li className="main-list">
            
            <NavLink className="btn-header" to="/about">
              {t("support")}
            </NavLink>
          
          

          </li>}

  
          {user && <li className="main-list">
            <NavLink className=" btn-header" to="/profile">
              {t("account")}
            </NavLink>
        
          </li>}

          {user && <li onClick={() => {
            signOut(auth).then(() => {
              console.log("Sign-out successful.")
            }).catch((error) => {
              // An error happened.
            });
          }} className="main-list">
            {/* <button className="main-link signout">
              {t("Sign-out")}
            </button> */}
            <button className="Btn">
  <div className="sign">
    <svg viewBox="0 0 512 512">
      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
    </svg>
  </div>
  <div className="text">Logout</div>
</button>


          </li>}


        </ul>
      </header>
    </div>
  );
};

export default Header;
