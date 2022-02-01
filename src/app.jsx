import React from 'react';
import One from './one';
import './style.css';
import Three from './three';
import Two from './two';

const App = () => {
	return (
		<>
			<h1>Reordering One List</h1>
			<One />
			<h1>Reordering Two List</h1>
			<Two />
			<h1>Reordering Three List</h1>
			<Three />
		</>
	);
};

export default App;
