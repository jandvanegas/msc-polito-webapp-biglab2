import { Button } from 'react-bootstrap';
import { Trash3Fill, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function FilmAction(props) {
	const navigate = useNavigate();
	return (
		<>
			<td>
				<Button onClick={() => navigate(`/edit/${props.film.id}`)}>
					<PencilSquare />
				</Button>
			</td>
			<td>
				<Button
					variant="danger"
					onClick={() => props.deleteFilm(props.film.id)}
				>
					<Trash3Fill />
				</Button>
			</td>
		</>
	);
}

export default FilmAction;
