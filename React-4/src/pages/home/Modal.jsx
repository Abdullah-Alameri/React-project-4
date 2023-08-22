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
    <Modal closeModal={closeModal}>
      <div
        className="model-content"
        style={{ textAlign: "left", height: "100%" }}
      >
        <input
          onChange={(eo) => {
            titleInput(eo);
          }}
          required
          placeholder="Add title:"
          type="text"
          value={taskTitle}
        />

        <div>
          <input
            onChange={(eo) => {
              datailsInput(eo);
            }}
            required
            placeholder="Details:"
            type="text"
            value={subTask}
          />

          <button
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
          style={{ marginBottom: "20px" }}
          onClick={(eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
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
