import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="section has-text-centered">
            <p className="subtitle">Что-то пошло не так или страница не найдена.</p>
            <a href="/" className="button is-link mt-4">Вернуться на главную</a>
        </div>
    );
}
