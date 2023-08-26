import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Erroe404 from '../pages/erroe404';
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

import { useTranslation } from 'react-i18next';

const Signup = () => {
  const {t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [userName, setuserName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // Loading    (done)
  // NOT sign-in  (done)
  // sign-in without Email verification   (done)
  // (sign-in && verified email) => navigate(/)    (done)

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });
// 
  const signUpBTN = async (eo) => {
    eo.preventDefault();

  await  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          //
          console.log("Email verification sent!");
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/operation-not-allowed":
            setfirebaseError("للأسف لا يًمكن انشاء حساب في الوقت الحالي");
            break;



          case "auth/user-not-found":
            setfirebaseError("Wrong Email");
            break;

          case "auth/wrong-password":
            setfirebaseError("Wrong Password");
            break;

          case "auth/too-many-requests":
            setfirebaseError("Too many requests, please try aganin later");
            break;

          default:
            setfirebaseError("Please check your email & password");
            break;
        }
      });

    
  };


  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main>
            <p>
              {i18n.language === "en" && "  We send you an email to verify your Account"}
              {i18n.language === "ar" && "  أرسلنا لك بريدًا إلكترونيًا للتحقق من حسابك"}
              {i18n.language === "fr" && "  Nous vous envoyons un e-mail pour vérifier votre compte"}
            
              </p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
        <div className="form-box">
  <form className="form">
    <span className="title">Sign up</span>
    <span className="subtitle">Create a free account with your email.</span>
    <div className="form-container">


      <input   onChange={(eo) => {
                setuserName(eo.target.value);
              }}
       type="text" className="input" placeholder="UserName" />


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
                signUpBTN(eo);
              }}
    >Sign up</button>
  </form>
  <div className="form-section">
    <p>
      Have an account? <Link to="/signin">Log in</Link>{" "}
    </p>
  </div>
</div>

          {/* <form>
            <p dir="auto" style={{ fontSize: "23px", marginBottom: "22px" }}>
              {i18n.language === "en" && "Create a new account "}
              {i18n.language === "ar" && "انشاء حساب جديد "}
              {i18n.language === "fr" && "Créer un nouveau compte"}
          
              
              <span>🧡</span>{" "}
            </p>

            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder=" UserName : "
              type="text"
            />

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
                signUpBTN(eo);
              }}
            >
            {t("signup")}
          
            </button>
            <p className="account">
              {i18n.language === "en" && "  Already hava an account "}
              {i18n.language === "ar" && "  هل لديك حساب "}
              {i18n.language === "fr" && "  Vous avez déjà un compte"}
            
              
              <Link to="/signin"> {t("signin")}</Link>
            </p>

            {hasError && <h2>{firebaseError}</h2>}
          </form> */}
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
