import { Container, Row, Col } from 'react-bootstrap';
import Films from './Films';
import AddFilm from './AddFilm';
import SideBar from './SideBar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Body(props) {
    const location = useLocation();
    const [selected, setSelected] = useState(location.state ? location.state : 1);
    return (
        <Container fluid>
            <Row>
                <SideBar
                    selected={selected}
                    setSelected={setSelected}
                    open={props.open}
                />
                <Col className="col-12 col-md-9">
                    <div className="d-flex justify-content-start m-3">
                        <h1>{props.filterSelected}</h1>
                    </div>
                    <Films
                        films={props.films}
                        filterSelected={props.filterSelected}
                        deleteFilmFactory={props.deleteFilmFactory}
                        setFilms={props.setFilms}
                        editFilmFactory={props.editFilmFactory}
                        patchFavoriteFactory={props.patchFavoriteFactory}
                    />
                    <AddFilm />
                </Col>
            </Row>
        </Container>
    );
}

export default Body;
