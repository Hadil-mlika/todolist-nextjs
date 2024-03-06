"use client"
import React, { FormEventHandler, useState } from 'react'
import { ITask } from '@/types/Task';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

import { IoIosCheckboxOutline } from "react-icons/io";

interface TaskProps {
  mytask: ITask
}


const Task: React.FC<TaskProps> = ({ mytask }) => {




  const router = useRouter();
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState(mytask.title)



  const handleEditNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: mytask.id,
      title: titleToEdit,
      completed: false
    })
    console.log(titleToEdit)
    setTitleToEdit("")
    setOpenModelEdit(false);
    router.refresh();
  }


  console.log(mytask)


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



  return (


    <tr className="bg-base-200">

      <td>{mytask.id}</td>
      <td>{mytask.title}</td>
      <td className='w-full'>{mytask.completed ? 'true' : 'false'}</td>
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

        <IoIosCheckboxOutline  cursor="pointer" size={25} className='text-green-500' />
        <IoIosCheckboxOutline  cursor="pointer" size={25} className='text-red-500' />






      </td>
    </tr>

  )
}

export default Task
