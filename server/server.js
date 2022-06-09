const express = require('express');
const bp = require('body-parser');
const {check, validationResult} = require('express-validator'); // validation middleware
const db_interface = require('./dao')
const morgan = require('morgan')
const dayjs = require('dayjs')
const PORT = 3001;
const cors = require('cors');

app = new express();
app.use(morgan('dev'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/api/films', async (req, res) => {
    let result;
    try {
        switch (req.query.filter) {
            case 'all':
                result = await db_interface.list_films();
                break
            case 'favorite':
                result = await db_interface.list_favorite_films();
                break
            case 'bestRated':
                result = await db_interface.list_best_rated_films();
                break
            case 'seenLastMonth':
                const allFilms1 = await db_interface.list_films()
                result = allFilms1.filter(film => (
                    film.watchDate.isValid() && film.watchDate.isAfter(dayjs().subtract(30, 'day'))));
                break
            case 'unseen':
                const allFilms2 = await db_interface.list_films();
                result = allFilms2.filter(film => !film.watchDate.isValid());
                break
            default:
                result = await db_interface.list_films();
        }
    } catch (err) {
        if (err.code && err.code === 'SQLITE_ERROR') {
            console.error(err)
            return res.status(503).end()
        } else {
            console.error(err)
            return res.status(500).end()
        }
    }
    const response = result.map(film => {
        return {
            ...film,
            watchDate: film.watchDate.isValid() ? film.watchDate.format("YYYY-MM-DD") : null
        }
    })
    return res.status(200).json(response);
});

app.get('/api/films/:id', async (req, res) => {
    const id = req.params.id

    let result;
    try {
        result = await db_interface.get_film_by_id(id);
    } catch (err) {
        if (err.code && err.code === 'SQLITE_ERROR') {
            return res.status(503).end()
        } else {
            return res.status(500).end()
        }
    }

    if (result === undefined) {
        return res.status(404).end();
    }
    const response = result.map(film => {
        return {
            ...film,
            watchDate: film.watchDate.isValid() ? film.watchDate.format("YYYY-MM-DD") : null
        }
    })
    return res.status(200).json(response);

})

app.post('/api/films', [
    check('title').isString().notEmpty(),
    check('favorite').isBoolean(),
    check('watchDate').isDate({format: 'YYYY-MM-DD', strictMode: true}).optional({nullable: true}),
    check('rating').isInt({min: 0, max: 5}).optional({nullable: true})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        await db_interface.add_film(req.body.title, req.body.favorite, req.body.watchDate, req.body.rating);
    } catch (err) {
        console.log(err);
        if (err.code && err.code === 'SQLITE_ERROR') {
            return res.status(503).end()
        } else {
            return res.status(500).end()
        }
    }
    return res.status(201);

})

app.put('/api/films/:id', async (req, res) => {
    // TODO: implement 404, 422
    const film_id = req.params.id;
    try {
        await db_interface.edit_film(film_id, req.body.title, req.body.favorite, req.body.watchDate, req.body.Rating);
    } catch (err) {
        console.log(err);
        if (err.code && err.code === 'SQLITE_ERROR') {
            return res.status(503).end()
        } else {
            return res.status(500).end()
        }
    }

    return res.status(200).end();

})

app.put('/api/films/:id/favorite', async (req, res) => {
    // TODO: implement 404, 422
    const film_id = req.params.id;
    const favourite = req.body.favorite;
    try {
        await db_interface.set_favourite_film(film_id, favourite);
    } catch (err) {
        console.log(err);
        if (err.code && err.code === 'SQLITE_ERROR') {
            return res.status(503).end()
        } else {
            return res.status(500).end()
        }
    }

    return res.status(200).end();

})

app.delete('/api/films/:id', async (req, res) => {
    // TODO: implement 404
    const film_id = req.params.id;
    try {
        await db_interface.delete_film(film_id);
    } catch (err) {
        console.log(err);
        if (err.code && err.code === 'SQLITE_ERROR') {
            return res.status(503).end()
        } else {
            return res.status(500).end()
        }
    }

    return res.status(204).end();

})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

module.exports = app;
