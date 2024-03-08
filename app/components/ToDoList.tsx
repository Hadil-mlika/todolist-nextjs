"use client"
import { ITask } from '@/types/Task';
import React, { useState } from 'react';
import Task from "./Task";
import Pagination from './Pagination';


import data from "@/data/todos.json";



interface TodoListProps {
    tasks: ITask[];
}


const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage
    const records = data.tasks.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.tasks.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const prePage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }

    }
    const changeCPage = (id: any) => {
        setCurrentPage(id)
    }





    return (

        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>

                        <th>id</th>
                        <th>title</th>
                        <th>status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((task) => (
                        <Task key={task.id} mytask={task} />
                    ))}
                </tbody>

            </table>


            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">

                <div className="join center">
                    <button className="join-item btn" onClick={prePage}>«</button>


                    {
                        numbers.map((n, i) => (

                            <button key={i} className="join-item btn" onClick={() => changeCPage(n)}>{n}</button>


                        ))
                    }


                    <button className="join-item btn" onClick={nextPage}>»</button>
                </div>
            </footer>

        </div>


    )
}

export default ToDoList
