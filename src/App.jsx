import React, {useEffect, useState} from "react";
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import logoImg from './img/logo.png'
import onImg from './img/on.png';
import offImg from './img/off.png';
import './style.css';
import lupa from './img/icons8-лупа-30.png';
import {analytics} from './Firebase.js';
import {logEvent} from 'firebase/analytics';
import Footer from './Footer/Footer.jsx';
import { useDebounce } from './Hook/HookDebounce.jsx'

export default function App() {

    const [user] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const [inputCity, setInputCity] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [searchTravel, setSearchTravel] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const navigate = useNavigate();
    const handleKeyDown = (e) => {
        if (searchTravel.length === 0) return;

        if (e.key === "ArrowDown") {
            setActiveIndex((prev) =>
                prev < Math.min(searchTravel.length, 5) - 1 ? prev + 1 : prev
            );
        } else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0){
                selectCity(searchTravel[activeIndex]);
            } else {
                handleSearch(e);
            }
        }
    };


    const handleBurgerClick = () => {
        setShowMenu(!showMenu);
        logEvent(analytics, 'burger-click', {state: !showMenu});
    }

    const darkTheme = () => {
        setDarkMode(!darkMode);
        logEvent(analytics, 'dark_mode_toggle', {enabled: !darkMode});
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const city = inputCity.trim();
        if (!city) return;
            setSearchCity(city);
            logEvent(analytics, "search_query", { query: inputCity });
            navigate("/now");

        setInputCity('');
        setSearchTravel([]);
        setActiveIndex(-1);
    };

    const debounceCity = useDebounce(inputCity, 500)
    useEffect(() => {
        const inputTravel = async () => {
            if (debounceCity.length > 1) {
            try {
                const response = await fetch(
                    `https://autocomplete.travelpayouts.com/places2?locale=ru&types[]=city&term=${debounceCity}`
                );
                const data = await response.json();
                setSearchTravel(data.map((item) => item.name));
            }catch(err) {
                console.log(err);
            }
            } else {
                setSearchTravel([]);
            }
        };
        inputTravel();
    }, [debounceCity]);
    const selectCity = (city) => {
        setInputCity('');
        setSearchCity(city);
        setSearchTravel([]);
        setActiveIndex(-1);
        navigate("/now");


    }

    return (
        <div className={darkMode ? "app dark-theme" : "app"} style={{
            height: "100vh",
        }}>
            <div className='container'>
                <nav className='navbar' role='navigation' aria-label='main navigation'>
                    <div className='navbar-brand'>
                        <NavLink to='/' className={({isActive}) => 'navbar is-uppercase ' +
                            (isActive ? 'active' : '')}>
                            <img src={logoImg}
                                 alt='logo'
                                 className='navbar-logo'
                            />
                        </NavLink>
                        <button className={showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
                                onClick={handleBurgerClick}
                                style={{}}
                        >
                            <span aria-hidden='true'></span>
                            <span aria-hidden='true'></span>
                            <span aria-hidden='true'></span>
                            <span aria-hidden='true'></span>
                            <span aria-hidden='true'></span>

                        </button>
                    </div>
                    <div className={showMenu ?
                        'navbar-menu is-active' :
                        'navbar-menu'}
                    >
                        <div className='navbar-start'>
                            {user && (
                                <NavLink to='now' className={({isActive}) =>
                                    'navbar-item' + (isActive ? ' is-active' : '')}
                                         onClick={() => {setShowMenu(false);
                                         logEvent(analytics, 'nav_click', {page: 'now'});
                                         }}
                                >
                                    Сейчас
                                </NavLink>
                            )}
                            {user && (
                                <NavLink to='today' className={({isActive}) =>
                                    'navbar-item' + (isActive ? ' is-active' : '')}
                                         onClick={() => {setShowMenu(false);
                                         logEvent(analytics, 'nav_click', {page: 'today'});
                                         }}
                                >
                                    Сегодня
                                </NavLink>
                            )}
                            {user && (
                                <NavLink to='fivedays' className={({isActive}) =>
                                    'navbar-item' + (isActive ? ' is-active' : '')}
                                         onClick={() => {setShowMenu(false);
                                         logEvent(analytics, 'nav_click', {page: 'fivedays'});
                                         }}
                                >
                                    5 дней
                                </NavLink>
                            )}
                            {user && (
                                <NavLink to='eightdays' className={({isActive}) =>
                                    'navbar-item' + (isActive ? ' is-active' : '')}
                                         onClick={() => {setShowMenu(false);
                                         logEvent(analytics, 'nav_click', {page: 'karta'});
                                         }}
                                >
                                    Карта погоды
                                </NavLink>
                            )}
                        </div>
                        <div className='navbar-end'>
                            {user && (
                                <div className='navbar-item'>
                                    <form className='navbar-item' onSubmit={handleSearch}
                                          style={{
                                              margin: 0,
                                              padding: 0
                                          }}>
                                        <input
                                            className="input is-normal"
                                            type="text"
                                            placeholder="Введите ваш город..."
                                            value={inputCity}
                                            onKeyDown={handleKeyDown}
                                            onChange={(event) => setInputCity(event.target.value)}
                                            style={{
                                                width: 350,
                                            }}
                                        />
                                        <button className='lupa' type='submit'>
                                            <img src={lupa} alt="Поиск"/>
                                        </button>
                                    </form>
                                    {searchTravel.length > 0 && (
                                        <ul className="autocomplete-list">
                                            {searchTravel.slice(0,5).map((city, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() => selectCity(city)}
                                                    style={{
                                                        cursor: "pointer",
                                                        background: i === activeIndex ? "#eee" : "#fff"
                                                    }}
                                                >
                                                    {city}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                            )}
                            {user && (
                                <div className='navbar-item'>
                                    <button className='is-small is-primary'
                                            aria-label="Toggle dark mode"
                                            onClick={darkTheme}>
                                        <img src={darkMode ? onImg : offImg}
                                             alt={darkMode ? "Dark mode on" : "Dark mode off"}
                                             style={{
                                                 width: 30,
                                                 height: 30,
                                             }}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </nav>
                <Outlet context={{searchCity, setSearchCity}}/>
            </div>
        <Footer />
        </div>
    )
}