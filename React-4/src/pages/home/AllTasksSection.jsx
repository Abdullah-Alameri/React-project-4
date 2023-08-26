import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ReactLoading from "react-loading";
import Moment from "react-moment/dist";
import { Link } from "react-router-dom/dist";

import { useTranslation } from "react-i18next";

const AllTasksSection = ({ user }) => {
  const { t, i18n } = useTranslation();

  const allTasks = query(collection(db, user.uid), orderBy("Id"));
  const completedTasks = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );
  const notcompletedTasks = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );

  const [initialData, setinitialData] = useState(allTasks);

  const [value, loading, error] = useCollection(initialData);
  const [isFullOpacity, setisFullOpacity] = useState(false);
  const [selectVlaue, setselectValue] = useState("aaa");

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        {/* <ReactLoading type={"spin"} color={"white"} height={77} width={77} /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="200px"
          width="200px"
          viewBox="0 0 200 200"
          className="pencil"
        >
          <defs>
            <clipPath id="pencil-eraser">
              <rect height={30} width={30} ry={5} rx={5} />
            </clipPath>
          </defs>
          <circle
            transform="rotate(-113,100,100)"
            strokeLinecap="round"
            strokeDashoffset="439.82"
            strokeDasharray="439.82 439.82"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            r={70}
            className="pencil__stroke"
          />
          <g transform="translate(100,100)" className="pencil__rotate">
            <g fill="none">
              <circle
                transform="rotate(-90)"
                strokeDashoffset={402}
                strokeDasharray="402.12 402.12"
                strokeWidth={30}
                stroke="hsl(223,90%,50%)"
                r={64}
                className="pencil__body1"
              />
              <circle
                transform="rotate(-90)"
                strokeDashoffset={465}
                strokeDasharray="464.96 464.96"
                strokeWidth={10}
                stroke="hsl(223,90%,60%)"
                r={74}
                className="pencil__body2"
              />
              <circle
                transform="rotate(-90)"
                strokeDashoffset={339}
                strokeDasharray="339.29 339.29"
                strokeWidth={10}
                stroke="hsl(223,90%,40%)"
                r={54}
                className="pencil__body3"
              />
            </g>
            <g
              transform="rotate(-90) translate(49,0)"
              className="pencil__eraser"
            >
              <g className="pencil__eraser-skew">
                <rect
                  height={30}
                  width={30}
                  ry={5}
                  rx={5}
                  fill="hsl(223,90%,70%)"
                />
                <rect
                  clipPath="url(#pencil-eraser)"
                  height={30}
                  width={5}
                  fill="hsl(223,90%,60%)"
                />
                <rect height={20} width={30} fill="hsl(223,10%,90%)" />
                <rect height={20} width={15} fill="hsl(223,10%,70%)" />
                <rect height={20} width={5} fill="hsl(223,10%,80%)" />
                <rect
                  height={2}
                  width={30}
                  y={6}
                  fill="hsla(223,10%,10%,0.2)"
                />
                <rect
                  height={2}
                  width={30}
                  y={13}
                  fill="hsla(223,10%,10%,0.2)"
                />
              </g>
            </g>
            <g
              transform="rotate(-90) translate(49,-30)"
              className="pencil__point"
            >
              <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)" />
              <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)" />
              <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)" />
            </g>
          </g>
        </svg>
      </section>
    );
  }

  if (value) {
    return (
      <div>
        {/* OPIONS (filtered data) */}
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex"
        >
          {selectVlaue === "aaa" && (
            <div>
              <button
                className="btn"
                style={{ opacity: isFullOpacity ? "1" : "0.3" }}
                onClick={() => {
                  setinitialData(
                    query(collection(db, user.uid), orderBy("Id", "desc"))
                  );
                  setisFullOpacity(true);
                }}
              >
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}
                {i18n.language === "fr" && "Le plus récent"}
              </button>

              <button
                className="btn"
                style={{ opacity: isFullOpacity ? "0.3" : "1" }}
                onClick={() => {
                  setinitialData(
                    query(collection(db, user.uid), orderBy("Id", "asc"))
                  );
                  setisFullOpacity(false);
                }}
              >
                {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولاً"}
                {i18n.language === "fr" && "Le plus ancien"}
              </button>
            </div>
          )}

          <select
            className="select"
            style={{ alignSelf: "flex-end" }}
            value={selectVlaue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setinitialData(query(collection(db, user.uid), orderBy("Id")));
                setselectValue("aaa");
                setisFullOpacity(false);
              } else if (eo.target.value === "bbb") {
                setinitialData(completedTasks);
                setselectValue("bbb");
              } else if (eo.target.value === "ccc") {
                setinitialData(notcompletedTasks);
                setselectValue("ccc");
              }
            }}
          >
            <option value="aaa">
              {i18n.language === "en" && "All Tasks"}
              {i18n.language === "ar" && "جميع المهام"}
              {i18n.language === "fr" && "Toutes les tâches"}
            </option>
            <option value="bbb">
              {i18n.language === "en" && "Completed"}
              {i18n.language === "ar" && "المهام المنتهية"}
              {i18n.language === "fr" && "Tâches terminées"}
            </option>
            <option value="ccc">
              {i18n.language === "en" && "Not Completed"}
              {i18n.language === "ar" && "المهام الغير منتهية"}
              {i18n.language === "fr" && "Tâches non terminées"}
            </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>
              {i18n.language === "en" && "Add a task 👇"}
              {i18n.language === "ar" && " 👇أضف مهمة"}
              {i18n.language === "fr" && "Füge eine Aufgabe hinzu 👇"}
            </h1>
          )}
          {/* Get date from DB */}
          {value.docs.map((item) => {
            return (
              <article key={item.data().Id} dir="auto" className="one-task">
                <Link to={`/editTask/${item.data().Id}`} className="task-link">
                  <h2>{item.data().title}</h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}>{item}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  {/* Date */}
                  <p dir="auto" className="time">
                    <Moment fromNow date={item.data().Id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
