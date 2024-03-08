

import { getAllTodos } from "@/api";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    todoList: [],
}
const baseUrl = 'http://localhost:3001';




export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {








        getAllTodos: (state, action) => {

            const res = fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
            return res.json();

        },



        saveTodo: (state, action) => {


            console.log(initialState.todoList)
            state.todoList.push(action.payload);
            const updatedTodoList = [...state.todoList, action.payload];
            console.log(initialState.todoList)



            fetch(`${baseUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(action.payload)  // Assuming action.payload is the todo data
            })
                .then((response) => {
                    console.log("check json"); // Move this line here
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP : ${response.status}`);
                    }
                    console.log("ok saved");
                    return response.text();
                })
                .catch((error) => {
                    console.error('Error during fetch:', error);
                    // Handle the error appropriately
                });



        },











        modifTask: (state, action) => {

            const data = getAllTodos()
            console.log(data)
            console.log("hello")

            fetch('http://localhost:3001/tasks')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP : ${response.status}`);
                    }
                    return response.json();
                })
                .then((allTodos) => {
                    console.log(allTodos);  

              

                    allTodos.forEach((task) => {
                        if (action.payload.id === task.id) {
                            task.title = action.payload.title
                            console.log(task.title)
                            fetch(`${baseUrl}/tasks/${task.id}`, {
                                method:'PUT',
                                headers:{
                                  'content-type':'application/json'
                                },
                                body:JSON.stringify(task)
                              })
                            console.log(`ID: ${task.id}, Title: ${action.payload.title}, Completed: ${task.completed}`);
                        }

                    
                    });
                })
                .catch((error) => {
                    console.error('Error during fetch:', error);
                });






        },





        setCheck: (state, action) => {
            state.todoList.map((task) => {
                if (action.payload === task.id) {

                    if (task.done) {
                        task.done = false
                    } else { task.done = true }


                }
            })

        },

        deleteTask: (state, action) => {
            console.log("bnjjjjj")
            state.todoList = state.todoList.filter((task) => { task.id != action.payload })
        },




    },
})

export const { saveTodo, setCheck, deleteTask, modifTask } = taskSlice.actions;

export default taskSlice.reducer;