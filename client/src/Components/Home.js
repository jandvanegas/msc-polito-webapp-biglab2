import Navigation from './Navigation';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Home(props) {
	const [open, setOpen] = useState(false);
	return (
		<div className="App">
			<Navigation open={open} setOpen={setOpen} handleLogout={props.handleLogout}/>
			<Outlet open={open} />
		</div>
	);
}

export default Home;
