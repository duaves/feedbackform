import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("/register", { name, email, password, password_confirmation })
            .then((response) => navigate("/feedbacks"))
            .catch((error) => {
                setErrors(Object.entries(error.response.data.errors));
            });
    };

    return (
        <>
            <div className="flex justify-center py-6">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Регистрация
                </h2>
            </div>
            {errors.length > 0 && (
                <div>
                    <div className="font-medium text-red-600">
                        Что-то пошло не так, проверьте правильность введенных
                        данных
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="name"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Имя
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        autoFocus
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        autoComplete="on"
                    />
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="password_confirmation"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Подтвердите пароль
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={password_confirmation}
                        onChange={(e) => {
                            setPasswordConfirmation(e.target.value);
                        }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        autoComplete="on"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                    >
                        Регистрация
                    </button>
                </div>

                <div className="mt-4">
                    Есть аккаунт?
                    <Link to="/login" className="text-blue-600 ml-1">
                        Войти
                    </Link>
                </div>
            </form>
        </>
    );
}
