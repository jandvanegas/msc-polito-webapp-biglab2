import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DefaultRoute from './Components/DefaultRoute';
import Home from './Components/Home';
import FilmForm from './Components/FilmForm';
import {useEffect, useState} from 'react';
import EditRoute from './Components/EditRoute';
import Body from './Components/Body';

import API from './API'

function App() {
    const [films, setFilms] = useState([]);

    const getFilms = async () => {
        const films = await API.get_all_films();
        setFilms(films);
    }

    useEffect(() => {
        getFilms();
    }, [])

    const addFilm = (film) => {
        film.status = 'added';
        setFilms((oldFilms) => [...oldFilms, film]);
        API.addFilm(film).then(() => getFilms(setFilms))
    };

    const deleteFilm = (filmId) => {
        setFilms((oldFilms) => {
            return oldFilms.map(film => {
               if (film.id === filmId) {
                   return {...film, state: 'deleted'}
               }
               return film;
            })
        });
        API.deleteFilm(filmId).then(() => getFilms())
    };

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route
                        index
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilmFactory={editFilmFactory}
                                patchFavoriteFactory={patchFavoriteFactory}
                                setFilms={setFilms}
                                filterSelected="All"
                            />
                        }
                    />
                    <Route
                        path="all"
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilmFactory={editFilmFactory}
                                patchFavoriteFactory={patchFavoriteFactory}
                                filterSelected="All"
                                setFilms={setFilms}
                            />
                        }
                    />
                    <Route
                        path="favorite"
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilmFactory={editFilmFactory}
                                patchFavoriteFactory={patchFavoriteFactory}
                                filterSelected="Favorite"
                                setFilms={setFilms}
                            />
                        }
                    />
                    <Route
                        path="bestRated"
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilmFactory={editFilmFactory}
                                patchFavoriteFactory={patchFavoriteFactory}
                                filterSelected="Best Rated"
                                setFilms={setFilms}
                            />
                        }
                    />
                    <Route
                        path="seenLastMonth"
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilmFactory={editFilmFactory}
                                patchFavoriteFactory={patchFavoriteFactory}
                                filterSelected="Seen Last Month"
                                setFilms={setFilms}
                            />
                        }
                    />
                    <Route
                        path="unseen"
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilmFactory={editFilmFactory}
                                patchFavoriteFactory={patchFavoriteFactory}
                                filterSelected="Unseen"
                                setFilms={setFilms}
                            />
                        }
                    />
                </Route>

                <Route path="*" element={<DefaultRoute/>}/>
                <Route
                    path="/add"
                    element={
                        <FilmForm addFilm={addFilm}/>
                    }
                />
                <Route path="/edit" element={<EditRoute editFilm={editFilm}/>}>
                    <Route index element={<h2>Please, Specify film id in the URL</h2>}/>
                    <Route
                        path=":filmId"
                        element={<FilmForm films={films} editFilm={editFilm}/>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
