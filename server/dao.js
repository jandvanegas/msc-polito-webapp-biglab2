const sqlite = require('sqlite3');
const dayjs = require('dayjs')

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

class DbInterface {

    list_films() {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT * FROM films`;

            db.all(sql, [], (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                const films = rows.map(row => ({
                    id: row.id,
                    title: row.title,
                    favorite: row.favorite,
                    watchDate: dayjs(row.watchdate),
                    Rating: row.rating
                }));

                resolve(films);
            });
        });
    }

    list_favorite_films() {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT * FROM films
                WHERE favorite = 1`;

            db.all(sql, [], (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                const films = rows.map(row => ({
                    id: row.id,
                    title: row.title,
                    favorite: row.favorite,
                    watchDate: dayjs(row.watchdate),
                    Rating: row.rating
                }));

                resolve(films);
            });
        });
    }

    list_best_rated_films() {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT * FROM films
                WHERE rating = 5`;

            db.all(sql, [], (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                const films = rows.map(row => ({
                    id: row.id,
                    title: row.title,
                    favorite: row.favorite,
                    watchDate: dayjs(row.watchdate),
                    Rating: row.rating
                }));

                resolve(films);
            });
        });
    }

    get_film_by_id(id) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT * FROM films
                WHERE id = ?`;

            db.get(sql, [id], (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                const film = {
                    id: row.id,
                    title: row.title,
                    favorite: row.favorite,
                    watchDate: dayjs(row.watchdate),
                    Rating: row.rating
                };

                resolve(film);
            });
        });
    }

    add_film(title, favorite, watchdate, rating) {
        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO films(title, favorite, watchdate, rating, user)
                VALUES (?, ?, ?, ?, ?);`

            // TODO: change when implementing users
            db.run(sql, [title, favorite, watchdate, rating, 1], (err) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(true);
            });
        });
    }

    edit_film(id, title, favorite, watchdate, rating) {
        return new Promise((resolve, reject) => {

            const sql = `
                UPDATE films
                SET 
                    title = ?, 
                    favorite = ?, 
                    watchdate = ?, 
                    rating = ?
                WHERE id = ?;`

            // TODO: change when implementing users
            db.run(sql, [title, favorite, watchdate, rating, id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve('');
            });
        });
    }

    set_favourite_film(id, favorite) {
        return new Promise((resolve, reject) => {

            const sql = `
                UPDATE films
                SET 
                    favorite = ?
                WHERE id = ?;`

            // TODO: change when implementing users
            db.run(sql, [favorite, id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve('');
            });
        });
    }

    delete_film(id) {
        return new Promise((resolve, reject) => {

            const sql = `
                DELETE FROM films
                WHERE id = ?;`

            // TODO: change when implementing users
            db.run(sql, [id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve('');
            });
        });
    }
}

module.exports = new DbInterface();