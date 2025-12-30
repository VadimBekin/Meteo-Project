import React from "react";
import s from './s.module.css';

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className="content has-text-centered-desktop">
                <p>© 2025 BelSkyMeteo</p>
            </div>
        </footer>
    );
}
