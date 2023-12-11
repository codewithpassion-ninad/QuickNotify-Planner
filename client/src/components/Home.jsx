import React, { useEffect, useState } from "react";
import Header from "./partials/Header";
import Todo from "./partials/Todo";
import AddTodoModal from "./partials/AddTodoModal";
import { useNavigate } from "react-router-dom";
import { getTodoListApi, getToken } from "../services/api";
import { ToastContainer, toast } from "react-toastify";


function Home() {
  const navigation = useNavigate();
  const [searchText, setSearchText]=useState("");

  const [list,setList]=useState([]);

  const [filteredList, setFilteredList]=useState([]);

  const [refreshList, setRefreshList]=useState();

  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList()
  }, [refreshList]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredList(list);
    } else {
      const filterList = list.filter((todo) => {
        const descMatch = todo.desc.toLowerCase().includes(searchText.toLowerCase().trim());
        const createdDate = new Date(todo.date);
        const daysAgo = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24)) + 1;
        const daysAgoMatch = daysAgo <= parseInt(searchText.trim()) && daysAgo > parseInt(searchText.trim()) - 1;
        return descMatch || daysAgoMatch;
      });
      setFilteredList(filterList);
    }
  }, [list, searchText]);


  async function fetchTodoList(){
    const result= await getTodoListApi()
    console.log('todolist',result)
    if(result.status===200 && result.data.status===200)
    {
      setList(result.data.data.todos.reverse())
    }
  }

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {
            filteredList.map((todo)=><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
          }

          {
            filteredList.length===0 && <div className="notFoundTodos">No todos Found.</div>
          }

        </div>
      </div>
      <div className="" style={{ position: "fixed", right: 50, zIndex: 1030 }}>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>
      <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  );
}

export default Home;
