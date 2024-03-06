import {ITask} from "./types/Task";
const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
}

export const addTodo = async (todo:ITask):Promise<ITask>=>{
  const res = await fetch(`${baseUrl}/tasks`, {
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(todo)
  })
  const newTodo=res.json()
  return newTodo
}

export const editTodo = async (todo:ITask):Promise<ITask>=>{
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method:'PUT',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(todo)
  })
  const editTodo=res.json()
  return editTodo
}

export const deleteTodo = async (todo:ITask):Promise<void>=>{
 await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method:'DELETE'
 
  })

}


export const check = async (todo:ITask):Promise<void>=>{
  const res =await fetch(`${baseUrl}/tasks/${todo.id}`, {
     method:'PUT',
     headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(todo)
  })
  const editTodo=res.json()
  return editTodo
  
   
 
 }