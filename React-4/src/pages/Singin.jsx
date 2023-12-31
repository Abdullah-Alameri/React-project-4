import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import Modal from "../shared/Modal";

import { useTranslation } from 'react-i18next';

const Signin = () => {
  const {t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [resetPass, setresetPass] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);


// Modal Codes
const [showModal, setshowModal] = useState(false);
const forgotPassword = () => {
  setshowModal(true);
}
const closeModal = () => {
  setshowModal(false)
}
// -------------

const signInBTN = (eo) => {
  eo.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      navigate("/");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;

      sethasError(true);

      switch (errorCode) {
        case "auth/invalid-email":
          setfirebaseError("Wrong Email");
          break;

        case "auth/user-not-found":
          setfirebaseError("Wrong Email");
          break;

        case "auth/wrong-password":
          setfirebaseError("Wrong Password");
          break;

        case "auth/too-many-requests":
          setfirebaseError(
            "Too many requests, please try aganin later"
          );
          break;

        default:
          setfirebaseError("Please check your email & password");
          break;
      }
    });
}


  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
      {showModal && (
      <Modal closeModal={closeModal}>
      <input style={{marginBottom: "30px"}}
       className="form__field"
              onChange={(eo) => {
                setresetPass(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <button className="modal__btn"
              onClick={(eo) => {
                eo.preventDefault();

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    console.log("send email");
                    setshowSendEmail(true);
                  })
                  .catch((error) => {
                    // ..
                  });
              }}
            >
              Reset Password
            </button>
            {showSendEmail && (
              <p className="check-email">
                Please check your email to reset your password.
              </p>
            )}
         </Modal>
      )}

    
<div className="form-box">
  <form className="form">
    <span className="title">Sign in</span>
    <span className="subtitle">Sign in to continue.</span>
    <div className="form-container">



      <input   onChange={(eo) => {
                setemail(eo.target.value);
              }}
       type="email" className="input" placeholder="Email" />


      <input     onChange={(eo) => {
                setpassword(eo.target.value);
              }}
       type="password" className="input" placeholder="Password" />


    </div>
    <button 
            onClick={(eo) => {
              signInBTN(eo)
            }}  
    >Sign in</button>
  </form>
  <div className="form-section">
    <p>
      Don't have an account? <Link to="/signup">Signup</Link>{" "}
    </p>

    <p
            onClick={() => {
              forgotPassword()
            }}
            className="forgot-pass mtt"
          >
            {i18n.language === "en" && "  Forgot password ?"}
            {i18n.language === "ar" && "  هل نسيت كلمة السر ؟"}
            {i18n.language === "fr" && "  Mot de passe oublié ?"}
          
          </p>

          {hasError && <h2>{firebaseError}</h2>}
  </div>
</div>

        {/* <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />

          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />

          <button
            onClick={(eo) => {
              signInBTN(eo)
            }}
          >
          {t("signin")}
          </button>
          <p className="account">
            {i18n.language === "en" && "  Don't hava an account "}
            {i18n.language === "ar" && " ليس لديك حساب"}
            {i18n.language === "fr" && "  Je n'ai pas de compte "}
          
            
            <Link to="/signup"> {t("signup")}</Link>
          </p>

          <p
            onClick={() => {
              forgotPassword()
            }}
            className="forgot-pass mtt"
          >
            {i18n.language === "en" && "  Forgot password ?"}
            {i18n.language === "ar" && "  هل نسيت كلمة السر ؟"}
            {i18n.language === "fr" && "  Mot de passe oublié ?"}
          
          </p>

          {hasError && <h2>{firebaseError}</h2>}
        </form> */}
      </main>
      <Footer />
    </>
  );
};

export default Signin;
