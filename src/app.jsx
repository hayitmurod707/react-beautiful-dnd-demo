import React from 'react';
import One from './one';
import './style.css';
import Three from './three';
import Two from './two';
const App = () => (
	<>
		<h2>Reordering One List</h2>
		<One />
		<h2>Reordering Two List</h2>
		<Two />
		<h2>Reordering Three List</h2>
		<Three />
	</>
);
export default App;
