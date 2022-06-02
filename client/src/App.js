import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultRoute from './Components/DefaultRoute';
import Home from './Components/Home';
import FilmForm from './Components/FilmForm';
import { useEffect, useState } from 'react';
import EditRoute from './Components/EditRoute';
import Body from './Components/Body';

import API from './API'

// const filmsLibrary = [
// 	{
// 		id: 1,
// 		title: 'Pulp Fiction',
// 		favorite: true,
// 		watchDate: dayjs('2022-03-10'),
// 		rating: 5,
// 	},
// 	{
// 		id: 2,
// 		title: '21 Grams',
// 		favorite: true,
// 		watchDate: dayjs('2022-03-10'),
// 		rating: 4,
// 	},
// 	{
// 		id: 3,
// 		title: 'Star Wars',
// 		favorite: false,
// 		watchDate: '',
// 		rating: 0,
// 	},
// 	{
// 		id: 4,
// 		title: 'Matrix',
// 		favorite: false,
// 		watchDate: '',
// 		rating: 0,
// 	},
// 	{
// 		id: 5,
// 		title: 'Shrek',
// 		favorite: false,
// 		watchDate: dayjs('2022-04-21'),
// 		rating: 3,
// 	},
// ];

function App() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const get_films = async () => {
            const films = await API.get_all_films();
            setFilms(films);
        }
        get_films();
    }, [])

    const addFilm = (film) => {
        setFilms((oldFilms) => [...oldFilms, film]);
    };

    const deleteFilm = (filmId) => {
        setFilms((oldFilms) => oldFilms.filter((film) => film.id !== filmId));
    };

    const editFilm = (film) => {
        setFilms((oldFilms) => {
            return oldFilms.map((oldFilm) => {
                if (oldFilm.id === film.id)
                    return {
                        id: film.id,
                        title: film.title,
                        favorite: film.favorite,
                        watchDate: film.watchDate,
                        rating: film.rating,
                    };
                else return oldFilm;
            });
        });
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route
                        index
                        element={
                            <Body
                                films={films}
                                deleteFilm={deleteFilm}
                                editFilm={editFilm}
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
                                editFilm={editFilm}
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
                                editFilm={editFilm}
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
                                editFilm={editFilm}
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
                                editFilm={editFilm}
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
                                editFilm={editFilm}
                                filterSelected="Unseen"
                                setFilms={setFilms}
                            />
                        }
                    />
                </Route>

                <Route path="*" element={<DefaultRoute />} />
                <Route
                    path="/add"
                    element={
                        <FilmForm addFilm={addFilm} nextFilmIndex={films.length + 1} />
                    }
                />
                <Route path="/edit" element={<EditRoute editFilm={editFilm} />}>
                    <Route index element={<h2>Please, Specify film id in the URL</h2>} />
                    <Route
                        path=":filmId"
                        element={<FilmForm films={films} editFilm={editFilm} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
