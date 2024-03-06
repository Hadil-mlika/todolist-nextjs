import { ITask } from '@/types/Task';
import React from 'react';
import Task from "./Task";




interface TodoListProps {
    tasks: ITask[];
}


const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (


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
                {tasks.map((task) => (
                    <Task key={task.id} mytask={task} />
                ))}
            </tbody>

        </table>


    )
}

export default ToDoList
