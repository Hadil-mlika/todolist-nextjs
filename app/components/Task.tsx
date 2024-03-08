"use client"
import React, { FormEventHandler, useState } from 'react'
import { ITask } from '@/types/Task';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { check, deleteTodo, editTodo } from '@/api';

import { IoIosCheckboxOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { modifTask} from "@/redux/features/taskSlice";


interface TaskProps {
  mytask: ITask
}


const Task: React.FC<TaskProps> = ({ mytask }) => {


  const dispatch = useDispatch()

  const router = useRouter();
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState(mytask.title)

  const [myTask, setMyTask] = useState(false)



  const handleEditNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (titleToEdit) {
      dispatch(modifTask({
        id: mytask.id,
        title: titleToEdit,
      
      }))

    }


    setTitleToEdit("")
    setOpenModelEdit(false);
    router.refresh();
  }





  const handleDeleteNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await deleteTodo({
      id: mytask.id,
      title: mytask.title,
      completed: mytask.completed
    })


    setOpenModelEdit(false);
    router.refresh();
  }



  const handlecheck = async (e: any) => {
    e.preventDefault();
    await check({
      id: mytask.id,
      title: mytask.title,
      completed: (mytask.completed ? false : true)
    })





    router.refresh();
  }



  return (


    <tr className="bg-base-200">

      <td>{mytask.id}</td>
      <td>{mytask.title}</td>
      <td className='w-full'>{mytask.completed ? 'checked' : 'not checked'}</td>
      <td className='flex gap-5'>
        <CiEdit cursor="pointer" onClick={() => setOpenModelEdit(true)} className='text-blue-500'
          size={25} />


        <Modal modalOpen={openModelEdit} setModalOpen={setOpenModelEdit}>

          <form onSubmit={handleEditNewTodo} >
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input
                value={titleToEdit}
                onChange={e => setTitleToEdit(e.target.value)}
                type="text"
                placeholder="add task name"
                className="input input-bordered input-info w-full max-w-xs" />
              <button type='submit' className='btn'>
                Edit
              </button>
            </div>
          </form>

        </Modal>










        <FaRegTrashAlt cursor="pointer" className='text-red-500' onClick={() => setOpenModelDelete(true)}
          size={25} />


        <Modal modalOpen={openModelDelete} setModalOpen={setOpenModelDelete}>

          <form onSubmit={handleDeleteNewTodo} >
            <h3 className='font-bold text-lg'> you want sure to delete this  task</h3>
            <div className='modal-action'>

              <button type='submit' className='btn'>
                delete
              </button>
            </div>
          </form>

        </Modal>

        <input
          type="checkbox"
          className='checkbox'
          id={mytask.id}
          checked={mytask.completed}
          onChange={handlecheck}
        />








      </td>
    </tr>

  )
}

export default Task
