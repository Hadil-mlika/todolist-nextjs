"use client"
import React, { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal"
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';
import { saveTodo } from '@/redux/features/taskSlice';
import { useDispatch } from 'react-redux';
import { taskSlice } from "@/redux/features/taskSlice";

const AddTask = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("")


    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (newTaskValue){


            dispatch(saveTodo({
                id: uuidv4(),
                title: newTaskValue,
                completed: false
            }))



        }
   


        console.log(newTaskValue)
        setNewTaskValue("")
        setModalOpen(false);
        router.refresh();
    }







    

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}

                className='btn btn-primary w-full'
            >
                Add new task <AiOutlinePlus className='ml-2' size={18} />
            </button>


            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>

                <form onSubmit={handleSubmitNewTodo} >
                    <h3 className='font-bold text-lg'>Add new task</h3>
                    <div className='modal-action'>
                        <input
                            value={newTaskValue}
                            onChange={e => setNewTaskValue(e.target.value)}
                            type="text"
                            placeholder="add task name"
                            className="input input-bordered input-info w-full max-w-xs" />
                        <button type='submit' className='btn'>
                            Submit
                        </button>
                    </div>
                </form>

            </Modal>


        </div>
    )
}

export default AddTask
