"use client"
import React, { useState } from 'react'
import data from "@/data/todos.json";

const Pagination = () => {
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



    )
}

export default Pagination
