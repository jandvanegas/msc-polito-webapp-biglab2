import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import dayjs from 'dayjs';
import {Link, useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

function FilmForm(props) {
    const navigate = useNavigate();
    const {filmId} = useParams();
    const editableFilm =
        filmId && props.films.find((f) => f.id === parseInt(filmId));
    const [title, setTitle] = useState(editableFilm ? editableFilm.title : '');
    const [favorite, setFavorite] = useState(
        editableFilm ? editableFilm.favorite : false
    );
    const [watchDate, setWatchDate] = useState(
        editableFilm ? editableFilm.watchDate : ''
    );
    const [rating, setRating] = useState(editableFilm ? editableFilm.rating : 0);

    const handleSubmit = (event) => {
        const film = {
            title: title,
            favorite: favorite,
            watchDate: dayjs(watchDate),
            rating: rating,
        };

        event.preventDefault();
        editableFilm ? props.editFilm(film) : props.addFilm(film);
        navigate('/');
    };

    return (
        <>
            <div className="d-flex container mt-5 justify-content-center">
                {editableFilm ? <h1>Update film data</h1> : <h1>New film</h1>}
            </div>
            <div className="container mt-3">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Film title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="m-5">
                        <Form.Check
                            type="checkbox"
                            label="Favorite"
                            checked={favorite}
                            onChange={() => setFavorite(!favorite)}
                        ></Form.Check>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Watch Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={dayjs(watchDate).format('YYYY-MM-DD')}
                            onChange={(event) =>
                                setWatchDate(dayjs(event.target.value).format('YYYY-MM-DD'))
                            }
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            min={0}
                            max={5}
                            type="number"
                            value={rating}
                            onChange={(event) => setRating(parseInt(event.target.value))}
                        ></Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit" className="m-2">
                            Save
                        </Button>
                        <Link to="/">
                            <Button variant="danger" className="m-2">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default FilmForm;
