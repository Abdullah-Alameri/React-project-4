import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useRef } from "react";

const TitleSection = ({ user, Id }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, Id));
  const inputElement = useRef(null)

  if (value) {
    console.log(value.data())
  }

  

  if (error) {
    return (
      <main>
        <h1>Error : {error.message}</h1>
      </main>
    );
  }

  if (loading) {
    return (
      <main>
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </main>
    );
  }

  if (value) {
    return (
      <section className="title center mttt">
        <h1>
    <input


          style={{textDecoration: value.data().completed? "line-through" : null }}
            ref={inputElement}

            onChange={async (eo) => {
              await updateDoc(doc(db, user.uid, Id), {
                title: eo.target.value,
              });
            }}
            defaultValue={value.data().title}
            className="title-input center line"
            type="text"
          />
          <i onClick={() => {
            inputElement.current.focus()
          }} className="fa-regular fa-pen-to-square"></i>
        </h1>

      </section>
    );
  }
};

export default TitleSection;
