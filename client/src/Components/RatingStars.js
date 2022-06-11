import { StarFill, Star } from "react-bootstrap-icons";

function RatingStars(props) {
	const stars = [];
	for (let index = 0; index < props.rating; index++) {
		stars.push(
			<StarFill
				key={index}
				onClick={(event) => {
					props.editFilm({...props.film, rating: index});
				}}
			/>
		);
	}
	for (let index = props.rating + 1; index <= 5; index++) {
		stars.push(
			<Star
				key={index}
				onClick={(event) => {
					props.editFilm({...props.film, rating: index});
				}}
			/>
		);
	}
	return <>{stars}</>;
}

export default RatingStars;
