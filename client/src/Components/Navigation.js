import { Form, FormControl, Navbar, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation(props) {
	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Button
					className="d-md-none"
					aria-controls="side-bar"
					aria-expanded={props.open}
					onClick={() => props.setOpen(!props.open)}
				>
					<span className="navbar-toggler-icon"></span>
				</Button>
				<Navbar.Brand href="#home">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-collection-play me-2"
						viewBox="0 0 16 16"
					>
						<path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
						<path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
					</svg>
					Film Library
				</Navbar.Brand>
				<Form className="d-none d-md-flex">
					<FormControl
						type="search"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
					/>
				</Form>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="white"
					className="bi bi-person-circle"
					viewBox="0 0 16 16"
				>
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
					<path
						fillRule="evenodd"
						d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
					/>
				</svg>
			</Container>
		</Navbar>
	);
}

export default Navigation;
