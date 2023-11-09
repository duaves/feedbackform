import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import {
    Link,
    NavLink,
    Outlet,
   
    useNavigate,
} from "react-router-dom";
import { AbilityContext, Can } from "../Abilities/Can";


function App() {
    const navigate = useNavigate();
    const ability = useContext(AbilityContext);

    const handleLogout = (event) => {
        axios.post("/logout").then(response => navigate("/login"))
    }

    useEffect(() => {
        axios.get('/api/user')
        .then(response =>{
            axios.get('/api/abilities')
                        .then(response => {
                            const { can, rules } = new AbilityBuilder(createMongoAbility);
                            can(response.data);
                            ability.update(rules);
                        })
        })
        .catch(error => {
            if (error.response.status === 401) {
                navigate('/login');
            }
        })
      });   

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center font-medium">
                                <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
</Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "inline-flex items-center px-1 pt-1 border-b-2 border-blue-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                                            : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                    }
                                >
                                    Заявки
                                </NavLink>
                                <Can do="feedback_form">
                                <NavLink
                                    to="/feedbacks/form"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "inline-flex items-center px-1 pt-1 border-b-2 border-blue-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                                            : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                    }
                                >
                                    Создать заявку
                                </NavLink>
                                </Can>
                            </div>
                        </div>
                        <div className="flex  items-center ml-6">
                            <div className="flex ml-3 relative">
                            

                                <button type="button" onClick={handleLogout} className="font-medium">
                                    Выйти
                                </button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            
            <main>
                <div className="py-12">
                    <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
