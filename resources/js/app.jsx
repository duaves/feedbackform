import "./bootstrap";
import React from "react";

import { createRoot } from "react-dom/client";

import App from "./Layouts/App";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FeedbacksIndex from "./Pages/Feedbacks";
import Form from "./Pages/Feedbacks/Form";
import Answer from "./Pages/Feedbacks/Answer";
import Guest from "./Layouts/Guest";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { AbilityContext } from "./Abilities/Can";
import Ability from "./Abilities/Ability";

const root = createRoot(document.getElementById("app"));
root.render(
    <AbilityContext.Provider value={Ability}>
        <BrowserRouter>
            <Routes>
                <Route path="feedbacks" element={<App />}>
                    <Route index element={<FeedbacksIndex />}></Route>
                    <Route path="/feedbacks/form" element={<Form />}></Route>
                    <Route
                        path="/feedbacks/answer/:id"
                        element={<Answer />}
                    ></Route>
                </Route>
                <Route path="login" element={<Guest />}>
                    <Route index element={<Login />}></Route>
                </Route>
                <Route path="register" element={<Guest />}>
                    <Route index element={<Register />}></Route>
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/feedbacks" replace />}
                />
            </Routes>
        </BrowserRouter>
    </AbilityContext.Provider>
);
