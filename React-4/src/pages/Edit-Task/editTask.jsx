import Footer from "../../comp/Footer";
import Header from "../../comp/header";
import Error404 from "../../pages/erroe404";
import { Helmet } from "react-helmet-async";
import "./editTask.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import Loading from "../../comp/Loading";
import TitleSection from "./1-TitleSection";
import SubTaskSection from "./2-SubTaskSection";
import BtnsSection from "./3-BtnsSection";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import ReactLoading from "react-loading";

const EditTask = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  let { Id } = useParams();

  // BtnSection
  const [showData, setshowData] = useState(false);

  const deleteBTN = async (eo) => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, Id));
    navigate("/", { replace: true });
  };

  if (error) {
    return <Error404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>EditTask</title>
        </Helmet>
        <Header />

        {showData ? (
          <main>
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={77}
              width={77}
            />
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TitleSection user={user} Id={Id} />
            {/* Sub-tasks section */}

            <SubTaskSection user={user} Id={Id} />

            {/* Add-more BTN && Delete BTN */}

            <BtnsSection user={user} Id={Id} deleteBTN={deleteBTN} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
