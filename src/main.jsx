import 'bulma/css/bulma.css'
import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import routes from './Routes.jsx';
import 'leaflet/dist/leaflet.css';


const root = ReactDOM.createRoot(
    document.getElementById("root"));

root.render(
    <React.StrictMode>

            <RouterProvider router={routes}/>

    </React.StrictMode>
)


