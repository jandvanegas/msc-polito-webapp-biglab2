const dayjs = require('dayjs')
const crypto = require('crypto');


function dao(db) {
    let user
    const mapFilms = (rows) => {
        return rows.map(row => {
            return ({
                id: row.id,
                title: row.title,
                favorite: row.favorite === 1,
                watchDate: dayjs(row.watchdate),
                rating: row.rating
            });
        });
    }

    const listFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT *
                          FROM films
                          WHERE user = ?`;
            db.all(sql, [user], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const films = mapFilms(rows);
                resolve(films);
            });
        });
    }


    const listFavoriteFilms = () => {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM films
                WHERE favorite = 1
                  and user = ?`;

            db.all(sql, [user], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const films = mapFilms(rows);
                resolve(films);
            });
        });
    }


    const listBestRatedFilms = () => {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM films
                WHERE rating = 5
                  and user = ?`;

            db.all(sql, [user], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const films = mapFilms(rows);
                resolve(films);
            });
        });
    }

    const getFilmById = (id) => {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM films
                WHERE id = ?
                  and user = ?`;

            db.get(sql, [id, user], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (row !== undefined) {
                    return {
                        id: row.id,
                        title: row.title,
                        favorite: row.favorite === 1,
                        watchDate: dayjs(row.watchdate),
                        rating: row.rating
                    };
                }
                resolve(undefined);
            });
        });
    }

    const addFilm = (title, favorite, watchdate, rating) => {
        return new Promise((resolve, reject) => {

            const sql = `
                INSERT INTO films(title, favorite, watchdate, rating, user)
                VALUES (?, ?, ?, ?, ?);`

            db.run(sql, [title, favorite, watchdate, rating, user], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    }

    const editFilm = (id, title, favorite, watchdate, rating) => {
        return new Promise((resolve, reject) => {

            const sql = `
                UPDATE films
                SET title     = ?,
                    favorite  = ?,
                    watchdate = ?,
                    rating    = ?
                WHERE id = ?
                  and user = ?;`

            db.run(sql, [title, favorite, watchdate, rating, id, user], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve('');
            });
        });
    }

    const setFavouriteFilm = (id, favorite) => {
        return new Promise((resolve, reject) => {

            const sql = `
                UPDATE films
                SET favorite = ?
                WHERE id = ?
                  and user = ?;`

            db.run(sql, [favorite, id, user], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve('');
            });
        });
    }

    const deleteFilm = (id) => {
        return new Promise((resolve, reject) => {

            const sql = `
                DELETE
                FROM films
                WHERE id = ?
                  and user = ?;`

            db.run(sql, [id, user], (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve('');
            });
        });
    }
    const getUser = (email, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined) {
                    resolve(false);
                } else {
                    const user = {id: row.id, username: row.email, name: row.name};

                    crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
                        if (err) reject(err);
                        if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
                            resolve(false);
                        else
                            resolve(user);
                    });
                }
            });
        });
    };

    const getUserById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE id = ?';
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined) {
                    resolve({error: 'User not found!'});
                } else {
                    const user = {id: row.id, username: row.email, name: row.name};
                    resolve(user);
                }
            });
        });
    };
    return {
        listFilms: listFilms,
        mapFilms: mapFilms,
        listFavoriteFilms: listFavoriteFilms,
        listBestRatedFilms: listBestRatedFilms,
        getFilmById: getFilmById,
        addFilm: addFilm,
        editFilm: editFilm,
        setFavoriteFilm: setFavouriteFilm,
        deleteFilm: deleteFilm,
        getUser: getUser,
        getUserById: getUserById,
    }
}

module.exports = {dao};
