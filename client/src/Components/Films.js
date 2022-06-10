import {Table} from 'react-bootstrap';
import {CheckBox} from './CheckBox';
import RatingStars from './RatingStars';
import FilmAction from './FilmAction';
import dayjs from 'dayjs';

import API from '../API'
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';

function Films(props) {

    let location = useLocation();
    const setFilms = props.setFilms

    useEffect(() => {
        const get_filtered_films = async () => {
            const filter = location.pathname.substring(1) !== '' ? location.pathname.substring(1) : 'all'
            const films = await API.get_filtered_films(filter)
            setFilms(films);
        }
        get_filtered_films();
    }, [location, setFilms])

    return (
        <Table striped hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Favorite</th>
                <th>Watch Date</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody>
            {props.films
                .map((film) => (
                    <FilmRow film={film}
                             patchFavorite={props.patchFavorite}
                             key={film.id}
                             deleteFilm={props.deleteFilm}
                             editFilm={props.editFilm}
                    />
                ))}
            </tbody>
        </Table>
    );
}

function FilmRow(props) {
    return (
        <tr>
            <FilmData film={props.film} patchFavorite={props.patchFavorite} editFilm={props.editFilm}></FilmData>
            <FilmAction deleteFilm={props.deleteFilm} film={props.film}/>
        </tr>
    );
}

function FilmData(props) {
    return (
        <>
            <td>{props.film.id}</td>
            <td style={props.film.favorite ? {color: 'red'} : {}}>
                {props.film.title}
            </td>
            <td>
                <CheckBox
                    editable={true}
                    value={props.film.favorite}
                    setValue={(newValue) => {
                        props.patchFavorite({...props.film, favorite: newValue});
                    }}
                />
            </td>
            <td>
                {dayjs(props.film.watchDate).isValid()
                    ? props.film.watchDate.format('MMMM DD, YYYY')
                    : ''}
            </td>
            <td>
                <RatingStars rating={props.film.rating} editFilm={props.editFilm} film={props.film} />
            </td>
        </>
    );
}

export default Films;
