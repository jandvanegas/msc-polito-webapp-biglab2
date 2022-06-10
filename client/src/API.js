import Film from './Film';

const API_URL = 'http://localhost:3001/api';
const get_all_films = async () => {
    const url = `${API_URL}/films`;
    const response = await fetch(url);
    const films_json = await response.json();
    if (response.ok) {
        return films_json.map(f => new Film(f.id, f.title, f.watchDate, f.rating, f.favorite));
    } else
        throw films_json;
};

const get_filtered_films = async (filter) => {
    const url = `${API_URL}/films?filter=${filter}`;
    const response = await fetch(url);
    const films_json = await response.json();
    if (response.ok) {
        return films_json.map(f => new Film(f.id, f.title, f.watchDate, f.rating, f.favorite));
    } else
        throw films_json;
};

const addFilm = async (film) => {
    const url = `${API_URL}/films`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: film.title,
            favorite: film.favorite,
            watchDate: film.watchDate.isValid() ? film.watchDate.format('YYYY-MM-DD') : null,
            rating: film.rating,
        })
    })
    if (!response.ok) {
        throw await response.json()
    }
}

const editFilm = async (film) => {
    const url = `${API_URL}/films/${film.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: film.title,
            favorite: film.favorite,
            watchDate: film.watchDate.isValid() ? film.watchDate.format('YYYY-MM-DD') : null,
            rating: film.rating,
        })
    })
    if (!response.ok) {
        throw await response.json()
    }
}

const patchFavorite = async (film) => {
    const url = `${API_URL}/films/${film.id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            favorite: film.favorite,
        })
    })
    if (!response.ok) {
        throw await response.json()
    }
}

const deleteFilm = async (filmId) => {
    const url = `${API_URL}/films/${filmId}`;
    const response = await fetch(url, {
            method: 'DELETE',
        }
    );
    if (!response.ok) {
        throw await response.json()
    }
};
const API = {get_all_films, get_filtered_films, addFilm, deleteFilm, editFilm, patchFavorite};
export default API;
