import React from 'react'
import { FcTodoList } from "react-icons/fc";

const NavBar = () => {
    return (
        <div>
            <div className="flex">
                <div>
                    <div><FcTodoList/></div>
                    <div>To-Do</div>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default NavBar
