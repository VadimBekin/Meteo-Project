import React from "react";
import {createRoutesFromElements, createBrowserRouter, Route, Navigate} from "react-router-dom";
import App from './App.jsx'
import PogodaSeychas from "./PogodaSeychas/PogodaSeychas.jsx";
import PogodaGlavn from "./PogodaGlavn/GlavnayaPogoda.jsx"
import PogodaFiveDays from "./PogodaFiveDays/PogodaFiveDays.jsx";
import PogodaSutki from "./PogodaSutki/PogodaSutki.jsx";
import PogodaEightDays from "./PogodaEightDays/PogodaEightDays.jsx";


const Routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>} >
            <Route path="/" index element={<PogodaGlavn />} />
            <Route path='now' element={<PogodaSeychas/>} />
            <Route path='today' element={<PogodaSutki/>} />
            <Route path='fivedays' element={<PogodaFiveDays/>} />
            <Route path='eightdays' element={<PogodaEightDays/>} />

        </Route>
    )
)
export default Routes;