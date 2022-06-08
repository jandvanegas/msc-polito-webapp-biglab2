import { StarFill, Star } from "react-bootstrap-icons";

function RatingStars(props) {
	const stars = [];
	for (let index = 0; index < props.rating; index++) {
		stars.push(<StarFill key={index} />);
	}
	for (let index = 0; index < 5 - props.rating; index++) {
		stars.push(<Star key={index + 10} />);
	}
	return <>{stars}</>;
}

export default RatingStars;
