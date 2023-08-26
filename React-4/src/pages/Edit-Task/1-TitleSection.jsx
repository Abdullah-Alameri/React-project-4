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
    <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
      <g className="pencil__eraser-skew">
        <rect height={30} width={30} ry={5} rx={5} fill="hsl(223,90%,70%)" />
        <rect
          clipPath="url(#pencil-eraser)"
          height={30}
          width={5}
          fill="hsl(223,90%,60%)"
        />
        <rect height={20} width={30} fill="hsl(223,10%,90%)" />
        <rect height={20} width={15} fill="hsl(223,10%,70%)" />
        <rect height={20} width={5} fill="hsl(223,10%,80%)" />
        <rect height={2} width={30} y={6} fill="hsla(223,10%,10%,0.2)" />
        <rect height={2} width={30} y={13} fill="hsla(223,10%,10%,0.2)" />
      </g>
    </g>
    <g transform="rotate(-90) translate(49,-30)" className="pencil__point">
      <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)" />
      <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)" />
      <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)" />
    </g>
  </g>
</svg>
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
