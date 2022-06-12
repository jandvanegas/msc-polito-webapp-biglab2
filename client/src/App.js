import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import DefaultRoute from './Components/DefaultRoute';
import Home from './Components/Home';
import FilmForm from './Components/FilmForm';
import {useEffect, useState} from 'react';
import EditRoute from './Components/EditRoute';
import Body from './Components/Body';

import API from './API'
import {Alert, Container, Row} from "react-bootstrap";
import {LoginRoute } from "./Components/Auth";

function App() {
    const [films, setFilms] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState('');

    const getFilms = async () => {
        const films = await API.get_all_films();
        setFilms(films);
    }

    useEffect(() => {
        const checkAuth = async () => {
            await API.getUserInfo(); // we have the user info here
            setLoggedIn(true);
        };
        checkAuth();
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const user = await API.logIn(credentials);
            setLoggedIn(true);
            setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
        } catch (err) {
            console.log(err);
            setMessage({msg: 'Incorrect user name or password', type: 'danger'});
        }
    };

    const handleLogout = async () => {
        await API.logOut();
        setLoggedIn(false);
        setFilms([]);
        setMessage('');
    };

    useEffect(() => {
        if (loggedIn) getFilms();
    }, [loggedIn])

    const addFilm = (film) => {
        film.status = 'added';
        setFilms((oldFilms) => [...oldFilms, film]);
        API.addFilm(film).then(() => getFilms(setFilms))
    };

    const deleteFilmFactory = (refreshFilms) => {
        return (filmId) => {
            setFilms((oldFilms) => {
                return oldFilms.map(film => {
                    if (film.id === filmId) {
                        return {...film, state: 'deleted'}
                    }
                    return film;
                })
            });
            API.deleteFilm(filmId).then(() => refreshFilms())
        };
    }

    const patchFavoriteFactory = (refreshFilms) => {
        return (film) => {
            setFilms((oldFilms) => {
                return oldFilms.map((oldFilm) => {
                    if (oldFilm.id === film.id)
                        return {
                            id: film.id,
                            title: film.title,
                            favorite: film.favorite,
                            watchDate: film.watchDate,
                            rating: film.rating,
                            status: 'edited'
                        };
                    else return oldFilm;
                });
            });
            API.patchFavorite(film).then(() => refreshFilms())
        }
    };

    const editFilmFactory = (refreshFilms) => {
        return (film) => {
            setFilms((oldFilms) => {
                return oldFilms.map((oldFilm) => {
                    if (oldFilm.id === film.id)
                        return {
                            id: film.id,
                            title: film.title,
                            favorite: film.favorite,
                            watchDate: film.watchDate,
                            rating: film.rating,
                            status: 'edited'
                        };
                    else return oldFilm;
                });
            });
            API.editFilm(film).then(() => refreshFilms())
        }
    };
    const editFilm = editFilmFactory(getFilms)

    return (
        <Container>
            {message && <Row>
                <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
            </Row> }
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={
                        loggedIn ? <Navigate replace to='/'/> : <LoginRoute login={handleLogin}/>
                    }/>
                    <Route path="/" element={
                        loggedIn ? <Home handleLogout={handleLogout}/> : <Navigate replace to='/login'/>
                    }>
                        <Route
                            index
                            element={
                                loggedIn ? <Body
                                    films={films}
                                    deleteFilmFactory={deleteFilmFactory}
                                    editFilmFactory={editFilmFactory}
                                    patchFavoriteFactory={patchFavoriteFactory}
                                    setFilms={setFilms}
                                    filterSelected="All"
                                /> : <Navigate replace to='/login'/>
                            }
                        />
                        <Route
                            path="all"
                            element={
                                loggedIn ? <Body
                                    films={films}
                                    deleteFilmFactory={deleteFilmFactory}
                                    editFilmFactory={editFilmFactory}
                                    patchFavoriteFactory={patchFavoriteFactory}
                                    filterSelected="All"
                                    setFilms={setFilms}
                                /> : <Navigate replace to='/login'/>
                            }
                        />
                        <Route
                            path="favorite"
                            element={
                                loggedIn ? <Body
                                    films={films}
                                    deleteFilmFactory={deleteFilmFactory}
                                    editFilmFactory={editFilmFactory}
                                    patchFavoriteFactory={patchFavoriteFactory}
                                    filterSelected="Favorite"
                                    setFilms={setFilms}
                                /> : <Navigate replace to='/login'/>
                            }
                        />
                        <Route
                            path="bestRated"
                            element={
                                loggedIn ? <Body
                                    films={films}
                                    deleteFilmFactory={deleteFilmFactory}
                                    editFilmFactory={editFilmFactory}
                                    patchFavoriteFactory={patchFavoriteFactory}
                                    filterSelected="Best Rated"
                                    setFilms={setFilms}
                                /> : <Navigate replace to='/login'/>
                            }
                        />
                        <Route
                            path="seenLastMonth"
                            element={
                                loggedIn ? <Body
                                    films={films}
                                    deleteFilmFactory={deleteFilmFactory}
                                    editFilmFactory={editFilmFactory}
                                    patchFavoriteFactory={patchFavoriteFactory}
                                    filterSelected="Seen Last Month"
                                    setFilms={setFilms}
                                /> : <Navigate replace to='/login'/>
                            }
                        />
                        <Route
                            path="unseen"
                            element={
                                loggedIn ? <Body
                                    films={films}
                                    deleteFilmFactory={deleteFilmFactory}
                                    editFilmFactory={editFilmFactory}
                                    patchFavoriteFactory={patchFavoriteFactory}
                                    filterSelected="Unseen"
                                    setFilms={setFilms}
                                /> : <Navigate replace to='/login'/>
                            }
                        />
                    </Route>

                    <Route path="*" element={<DefaultRoute/>}/>
                    <Route
                        path="/add"
                        element={
                            loggedIn ? <FilmForm addFilm={addFilm}/> : <Navigate replace to='/login'/>
                        }
                    />
                    <Route path="/edit" element={<EditRoute editFilm={editFilm}/>}>
                        <Route index element={<h2>Please, Specify film id in the URL</h2>}/>
                        <Route
                            path=":filmId"
                            element={
                                loggedIn ? <FilmForm films={films} editFilm={editFilm}/> :
                                    <Navigate replace to='/login'/>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
