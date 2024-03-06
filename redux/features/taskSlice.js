

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    todoList: [],
}
const baseUrl = 'http://localhost:3001';


export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {


        saveTodo: async (state, action) => {
            state.todoList.push(action.payload);
        
            const res = await fetch(`${baseUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(action.payload)  // Assuming action.payload is the todo data
            });
        
            // Handle the response if needed
            // For example, you can check if the request was successful:
            if (res.ok) {
                // Do something with the successful response
            } else {
                // Handle the error
                console.error('Failed to save todo:', res.statusText);
            }
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


        modifTask: (state, action) => {
            console.log("hello")
            state.todoList.map((task) => {
                console.log(action.payload.id)
                console.log(task.id)
                if (action.payload.id === task.id) {
                    task.title = action.payload.title
                }
            })
        }


    },
})

export const { saveTodo, setCheck, deleteTask, modifTask } = taskSlice.actions;

export default taskSlice.reducer;