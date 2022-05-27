import { ListGroup } from 'react-bootstrap';

function ListItem(props) {
	return (
		<ListGroup.Item
			action
			onClick={() => {
				props.setSelected(props.id);
				props.navigate(props.url, { state: props.id });
			}}
			active={props.id === props.selected}
		>
			{props.filter}
		</ListGroup.Item>
	);
}

export default ListItem;
