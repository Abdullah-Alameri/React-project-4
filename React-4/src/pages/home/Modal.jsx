import React from "react";
import ReactLoading from "react-loading";
import Modal from "../../shared/Modal";

const HomeModal = ({
  closeModal,
  titleInput,
  datailsInput,
  addBTN,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) => {
  return (
    //   <Modal closeModal={closeModal}>
    //   <div
    //     className="model-content"
    //     style={{ textAlign: "left", height: "100%" }}
    //   >
    //     <input
    //       onChange={(eo) => {
    //         titleInput(eo);
    //       }}
    //       required
    //       placeholder="Add title:"
    //       type="text"
    //       value={taskTitle}
    //     />

    //     <div>
    //       <input
    //         onChange={(eo) => {
    //           datailsInput(eo);
    //         }}
    //         required
    //         placeholder="Details:"
    //         type="text"
    //         value={subTask}
    //       />

    //       <button
    //         onClick={(eo) => {
    //           addBTN(eo);
    //         }}
    //       >
    //         Add
    //       </button>
    //     </div>

    //     <ul>
    //       {array.map((item) => (
    //         <li key={item}>{item}</li>
    //       ))}
    //     </ul>

    //     <button
    //       style={{ marginBottom: "20px" }}
    //       onClick={(eo) => {
    //         submitBTN(eo);
    //       }}
    //     >
    //       {showLoading ? (
    //         <ReactLoading
    //           type={"spin"}
    //           color={"white"}
    //           height={20}
    //           width={20}
    //         />
    //       ) : (
    //         "Submit"
    //       )}
    //     </button>
    //   </div>
    // </Modal>

    <Modal closeModal={closeModal}>
      <div
        className="model-content form__group field"
        style={{ textAlign: "left", height: "100%" }}
      >
        <div className="form__group field ">
          <input
            onChange={(eo) => {
              titleInput(eo);
            }}
            requi
            required
            placeholder="Title"
            className="form__field"
            type="text"
            value={taskTitle}
          />
          <label className="form__label" htmlFor="name">
            Title
          </label>
        </div>

        <div className="form__group field flex">
          <input
            onChange={(eo) => {
              datailsInput(eo);
            }}
            required
            placeholder="Details"
            className="form__field"
            type="text"
            value={subTask}
          />
          <label className="form__label" htmlFor="name">
            Details
          </label>
          <button
            style={{ marginLeft: "10px", marginTop: "px" }}
            className="modal__btn"
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>

        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          className="modal__btn"
          style={{ marginBottom: "15px" }}
          onClick={(eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={25}
              width={25}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
