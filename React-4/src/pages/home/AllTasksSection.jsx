import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ReactLoading from "react-loading";
import Moment from "react-moment/dist";
import { Link } from "react-router-dom/dist";

import { useTranslation } from 'react-i18next';

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
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
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

<select style={{alignSelf: "flex-end"}}
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
              {i18n.language === "en" &&  "All Tasks"}
              {i18n.language === "ar" &&  "جميع المهام"}
              {i18n.language === "fr" && "Toutes les tâches"}
          
              </option>
            <option value="bbb">
            {i18n.language === "en" &&  "Completed"}
            {i18n.language === "ar" &&  "المهام المنتهية"}
            {i18n.language === "fr" && "Tâches terminées"}
            </option>
            <option value="ccc">
            {i18n.language === "en" &&  "Not Completed"}
            {i18n.language === "ar" &&  "المهام الغير منتهية"}
            {i18n.language === "fr" && "Tâches non terminées"}
              
          </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>
              {i18n.language === "en" && "Congratulations! You have copleted your tasks 💪"}
              {i18n.language === "ar" && " 💪 تهانينا! لقد أكملت مهامك"}
              {i18n.language === "fr" && "Toutes nos félicitations! Vous avez terminé vos tâches 💪"}
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
                  <p dir="auto" className="time"
                >
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
