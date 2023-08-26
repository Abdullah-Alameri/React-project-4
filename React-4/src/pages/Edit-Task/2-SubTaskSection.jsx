import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import Moment from "react-moment/dist";
import { useTranslation } from "react-i18next";

const SubTaskSection = ({ user, Id }) => {
  const { t, i18n } = useTranslation();

  const [value, loading, error] = useDocument(doc(db, user.uid, Id));
  const [showNewTask, setshowNewTask] = useState(false);
  const [subTitle, setsubTitle] = useState("");

  if (value) {
    return (
      <section className="sub-task mt">
        <div className="parent-time">
          <p className="time">
            Created
            <Moment fromNow date={value.data().Id} />
          </p>
          <div>
            {/* <input
              onChange={async (eo) => {
                if (eo.target.checked) {
                  await updateDoc(doc(db, user.uid, Id), {
                    completed: true,
                  });
                } else {
                  await updateDoc(doc(db, user.uid, Id), {
                    completed: false,
                  });
                }
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            /> */}

<label>
  <input defaultChecked="" type="checkbox" />
  <p className="checkbox" />
</label>



            <label htmlFor="checkbox">{t("completed")}</label>

          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p className="sub">{item}</p>
              <button
                  onClick={async (eo) => {
                    await updateDoc(doc(db, user.uid, Id), {
                      details: arrayRemove(item),
                    });
                  }}
                  className="btnn"
                >
                  <svg
                    viewBox="0 0 15 17.5"
                    height="17.5"
                    width={15}
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      transform="translate(-2.5 -1.25)"
                      d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                      id="Fill"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
        {showNewTask && (
          <form style={{ flexDirection: "row" }} className="add-new-task flex">
            <input
              value={subTitle}
              onChange={(eo) => {
                setsubTitle(eo.target.value);
              }}
              className="add-task"
              type="text"
            />

            <button
              onClick={async (eo) => {
                eo.preventDefault();
                setsubTitle("");
                await updateDoc(doc(db, user.uid, Id), {
                  details: arrayUnion(subTitle),
                });
              }}
              className="add"
            >
              Add
            </button>

            <button
              onClick={() => {
                setshowNewTask(false);
              }}
              className="cancel"
            >
              Cancel
            </button>
          </form>
        )}

        <button
          onClick={(eo) => {
            eo.preventDefault();
            setshowNewTask(true);
          }}
          className="add-more-btn mttt"
        >
          {i18n.language === "en" && "Add more"}
          {i18n.language === "ar" && "أضف المزيد"}
          {i18n.language === "fr" && "Ajouter plus"}

          <i className="fa-solid fa-plus"></i>
        </button>
      </section>
    );
  }
};

export default SubTaskSection;
