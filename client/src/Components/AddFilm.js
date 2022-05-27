import { Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function AddFilm(props) {
	return (
		<Link to="/add">
			<Button variant="outline-primary" size="lg">
				<PlusCircleFill size={40} />
			</Button>
		</Link>
	);
}

export default AddFilm;
