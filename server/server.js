const express = require('express');
const bp = require('body-parser');
const {check, validationResult} = require('express-validator'); // validation middleware
const {dao} = require('./dao')
const morgan = require('morgan')
const dayjs = require('dayjs')
const PORT = 3001;
const cors = require('cors');
const sqlite = require("sqlite3");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

app = new express();
app.use(morgan('dev'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});
const myDao = dao(db);

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions));
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await myDao.getUser(username, password)
    if(!user) return cb(null, false, 'Incorrect username or password.');
    return cb(null, user);
}));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
});
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({error: 'Not authorized'});
}
app.use(session({
    secret: "super_secret_secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
    res.status(201).json(req.user);
});

app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
        res.json(req.user);}
    else
        res.status(401).json({error: 'Not authenticated'});
});

app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});

app.get('/api/films', isLoggedIn, async (req, res) => {
    myDao.user = req.user
    let result;
    try {
        switch (req.query.filter) {
            case 'all':
                result = await myDao.listFilms();
                break
            case 'favorite':
                result = await myDao.listFavoriteFilms();
                break
            case 'bestRated':
                result = await myDao.listBestRatedFilms();
                break
            case 'seenLastMonth':
                const allFilms1 = await myDao.listFilms();
                result = allFilms1.filter(film => (
                    film.watchDate.isValid() && film.watchDate.isAfter(dayjs().subtract(30, 'day'))));
                break
            case 'unseen':
                const allFilms2 = await myDao.listFilms();
                result = allFilms2.filter(film => !film.watchDate.isValid());
                break
            default:
                result = await myDao.listFilms();
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
    myDao.user = req.user
    const id = req.params.id
    let result;
    try {
        result = await myDao.getFilmById(id);
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
    myDao.user = req.user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        await myDao.addFilm(req.body.title, req.body.favorite, req.body.watchDate, req.body.rating);
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

app.put('/api/films/:id', [
    check('id').isInt(),
    check('title').isString().notEmpty(),
    check('favorite').isBoolean(),
    check('watchDate').isDate({format: 'YYYY-MM-DD', strictMode: true}).optional({nullable: true}),
    check('rating').isInt({min: 0, max: 5}).optional({nullable: true})
], async (req, res) => {
    myDao.user = req.user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const film_id = req.params.id;
    try {
        await myDao.editFilm(film_id, req.body.title, req.body.favorite, req.body.watchDate, req.body.rating);
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

app.patch('/api/films/:id', [
    check('favorite').isBoolean(),
], async (req, res) => {
    myDao.user = req.user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const film_id = req.params.id;
    const favourite = req.body.favorite;
    try {
        await myDao.setFavoriteFilm(film_id, favourite);
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
    myDao.user = req.user
    const film_id = req.params.id;
    try {
        await myDao.deleteFilm(film_id);
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
