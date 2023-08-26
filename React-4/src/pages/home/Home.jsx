import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Snackbar from "../../shared/Snackbar";
import HomeModal from "./Modal";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { t, i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  console.log(user);

  // =======================
  // FUNCTION of Modal
  // ========================
  const [showModal, setshowModal] = useState(false);
  const [taskTitle, settaskTitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);

  const forgotPassword = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
    setarray([]);
  };

  const titleInput = (eo) => {
    settaskTitle(eo.target.value);
  };

  const datailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }
    setsubTask("");
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      Id: taskId,
    });

    setshowLoading(false);

    settaskTitle("");
    setarray([]);

    setshowModal(false);
    setshowMessage(true);

    setTimeout(() => {
      setshowMessage(false);
    }, 4000);
  };

  // =======================
  // End FUNCTION of Modal
  // ========================

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main className="bild-container">
          <p className="pls">
            {i18n.language === "en" && "Please"}
            {i18n.language === "ar" && " رجاءاً قم ب"}
            {i18n.language === "fr" && "S'il te plaît"}

            <Link style={{ fontSize: "30px", margin: "6px" }} to="/signin">
              {t("signin")}
            </Link>
            {i18n.language === "en" && "  to continue..."}
            {i18n.language === "ar" && "  للماوصلة"}
            {i18n.language === "en" && " continuer... "}

            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }


    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* SHOW all tasks */}

            <AllTasksSection user={user} />

            {/* Add new task BTN */}

            <section>
              
              <button 
                onClick={() => {
                  forgotPassword();

                }} type="button" className="button mttt">
                <span dir="auto" className="button__text">
                  {i18n.language === "en" && "Add new task"}
                  {i18n.language === "ar" && "أضف مهمة جديدة"}
                  {i18n.language === "fr" && "Ajouter une tâche"}

                  
                </span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    height={24}
                    fill="none"
                    className="svg"
                  >
                    <line y2={19} y1={5} x2={12} x1={12} />
                    <line y2={12} y1={12} x2={19} x1={5} />
                  </svg>
                </span>
              </button>

              {/* <button
              dir="auto"
                onClick={() => {
                  forgotPassword();
                }}
                className="add-task-btn mttt "
              >
            {i18n.language === "en" &&  "Add new task"}
            {i18n.language === "ar" &&  "أضف مهمة جديدة"}
            {i18n.language === "fr" && "Ajouter une nouvelle tâche"}

            <i className="fa-solid fa-plus"></i>
              </button> */}
            </section>

            {showModal && (
              <HomeModal
                closeModal={closeModal}
                titleInput={titleInput}
                datailsInput={datailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}

            <Snackbar showMessage={showMessage} />
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
