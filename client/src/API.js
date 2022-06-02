import Film from './Film';

const get_all_films = async () => {
    const response = await fetch('http://localhost:3001/api/films');
    const films_json = await response.json();
    if (response.ok) {
        return films_json.map(f => new Film(f.id, f.title, f.favourite === 1, f.watchDate, f.Rating));
    }
    else
        throw films_json;
};

const get_filtered_films = async (filter) => {
    console.log('http://localhost:3001/api/films/' + filter);
    const response = await fetch('http://localhost:3001/api/films/' + filter);
    const films_json = await response.json();
    if (response.ok) {
        return films_json.map(f => new Film(f.id, f.title, f.favourite === 1, f.watchDate, f.Rating));
    }
    else
        throw films_json;
};

const API = { get_all_films, get_filtered_films };
export default API;