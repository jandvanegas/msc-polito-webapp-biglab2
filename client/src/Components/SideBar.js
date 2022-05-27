import React from 'react';
import { Collapse } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';

function SideBar(props) {
	const navigate = useNavigate();
	return (
		<Collapse in={props.open} className="col-12 d-md-block col-md-3">
			<aside id="side-bar">
				<ListGroup variant="flush" className="my-2">
					<ListItem
						id={1}
						selected={props.selected}
						setSelected={props.setSelected}
						navigate={navigate}
						filter="All"
						url="/all"
					></ListItem>
					<ListItem
						id={2}
						selected={props.selected}
						setSelected={props.setSelected}
						navigate={navigate}
						filter="Favorite"
						url="/favorite"
					></ListItem>
					<ListItem
						id={3}
						selected={props.selected}
						setSelected={props.setSelected}
						navigate={navigate}
						filter="Best Rated"
						url="/bestRated"
					></ListItem>
					<ListItem
						id={4}
						selected={props.selected}
						setSelected={props.setSelected}
						navigate={navigate}
						filter="Seen Last Month"
						url="/seenLastMonth"
					></ListItem>
					<ListItem
						id={5}
						selected={props.selected}
						setSelected={props.setSelected}
						navigate={navigate}
						filter="Unseen"
						url="/unseen"
					/>
				</ListGroup>
			</aside>
		</Collapse>
	);
}

export default SideBar;
