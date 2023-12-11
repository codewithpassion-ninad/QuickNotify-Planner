import React, { useState } from "react";
import {toast } from "react-toastify";
import { createTodoApi } from "../../services/api";

function AddTodoModal({ setRefreshList }) {
  const [todoDesc, setTodoDesc] = useState("");
  const [todoTimer, setTodoTimer] = useState(""); // Use a separate state variable for the timer

  const handleTodoSubmit = async () => {
    if (todoDesc.length === 0) {
      toast("Todo is required");
      return;
    }

    const result = await createTodoApi({ desc: todoDesc, timer: todoTimer }); // Pass both description and timer

    if (result.status === 200 && result.data.status === 200) {
      toast("Todo Added");
      setRefreshList(new Date());
      setTodoDesc(''); // Clear the input fields
      setTodoTimer(''); // Clear the input fields
    } else {
      toast(result.data.message);
    }
  };

  return (
    <div className="modal mt-5" id="exampleModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Add New Todo</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <span arial-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                name=""
                className="form-control"
                rows={3}
                onChange={(e) => {
                  setTodoDesc(e.target.value);
                }}
                placeholder="Write Todos..."
              ></textarea>
            </div>
            <div className="form-group">
              <div className="modal-title my-2">Add Timer</div>
              <input // Use <input> for timer
                type="text"
                className="form-control"
                onChange={(e) => {
                  setTodoTimer(e.target.value);
                }}
                placeholder="Add Timer (in Mins)..."
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleTodoSubmit} data-bs-dismiss="modal">
              Save Todo
            </button>
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setTodoDesc("");
                setTodoTimer(""); // Clear the timer input
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;
