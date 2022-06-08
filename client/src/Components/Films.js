import { Table } from 'react-bootstrap';
import { CheckBox } from './CheckBox';
import RatingStars from './RatingStars';
import FilmAction from './FilmAction';
import dayjs from 'dayjs';

import API from '../API'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Films(props) {

    let location = useLocation();

    useEffect(() => {
        const get_filtered_films = async () => {
            const films = await API.get_filtered_films(location.pathname.substring(1))
            props.setFilms(films);
        }
        get_filtered_films();
    }, [location])

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
                        <FilmRow film={film} key={film.id} deleteFilm={props.deleteFilm} />
                    ))}
            </tbody>
        </Table>
    );
}

function FilmRow(props) {
    return (
        <tr>
            <FilmData film={props.film}></FilmData>
            <FilmAction deleteFilm={props.deleteFilm} film={props.film} />
        </tr>
    );
}

function FilmData(props) {
    return (
        <>
            <td>{props.film.id}</td>
            <td style={props.film.favorite ? { color: 'red' } : {}}>
                {props.film.title}
            </td>
            <td>
                <CheckBox favorite={props.film.favorite} />
            </td>
            <td>
                {dayjs(props.film.watchDate).isValid()
                    ? props.film.watchDate.format('MMMM DD, YYYY')
                    : ''}
            </td>
            <td>
                <RatingStars rating={props.film.rating} />
            </td>
        </>
    );
}

export default Films;
