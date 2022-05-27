import { Table } from 'react-bootstrap';
import { CheckBox } from './CheckBox';
import RatingStars from './RatingStars';
import FilmAction from './FilmAction';
import dayjs from 'dayjs';

function Films(props) {
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
					.filter((film) => {
						switch (props.filterSelected) {
							case 'Favorite':
								return film.favorite;
							case 'Best Rated':
								return film.rating === 5;
							case 'Seen Last Month':
								return (
									dayjs(film.watchDate).isValid() &&
									dayjs().subtract(30, 'days').isBefore(film.watchDate)
								);
							case 'Unseen':
								return !dayjs(film.watchDate).isValid();
							default:
								return true;
						}
					})
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
