import React, { useEffect, useRef } from "react";
import { MarkTodoApi, deleteTodoApi } from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './todo.css';
import moment from "moment";
import notificationSound from './notification.mp3';

function Todo({ todo, setRefreshList }) {
  const audioRef = useRef(null);

  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todo_id: todo._id
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast('Deleted');
    } else {
      toast("Failed to Delete, Please try again");
    }
  }

  const handleMarkTodo = async () => {
    const result = await MarkTodoApi({
      todo_id: todo._id
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast(result.data.message);
    } else {
      toast("Failed to Mark, Please try again");
    }
  }

  const timeDelay = todo.timer ? todo.timer * 60000 : 0;

  const timerRef = useRef(null);

  useEffect(() => {
    if (timeDelay > 0) {
      timerRef.current = setTimeout(() => {
        toast("Complete the task as early as possible", {
          type: "info",
          onOpen: () => {
            if (audioRef.current) {
              audioRef.current.play()
                .then(() => {
                  // Audio played successfully
                })
                .catch(error => {
                  console.error("Error playing audio:", error);
                });
            }
          },
          onClose: () => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          },
        });
      }, timeDelay);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timeDelay]);

  return (
    <div className={`col-sm-3 mx-3 my-2 alert ${todo.isCompleted ? 'bg-success' : 'bg-light'}`}>
      <div className="card-header space-between">
        <div className="element1">
          {todo.isCompleted ? 'Completed' : 'Not Completed'}
        </div>
        <div className="element2">
          {todo.timer ? `${todo.timer} mins` : ''}
        </div>
      </div>

      <div className="card-body">
        <h4 className="card-title my-2" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>{todo.desc}</h4>
        <p className="card-text">
          {moment(todo.date).fromNow()}
        </p>
      </div>

      <div className='actionButtons my-2' style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <div className='deleteButton'>
          <button style={{ background: 'red' }} onClick={handleDelete}>Delete</button>
        </div>
        <div className='markTodo my-2'>
          <button onClick={handleMarkTodo} style={{ background: ' ' }}>{todo.isCompleted ? "Mark Uncomplete" : "Mark Complete"}</button>
        </div>
      </div>

      <audio ref={audioRef} src={notificationSound} />
    </div>
  );
}

export default Todo;
