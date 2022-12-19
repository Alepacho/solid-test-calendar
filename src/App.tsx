import { useNavigate } from '@solidjs/router';
import { Container, Button } from 'solid-bootstrap';
import { Component, createEffect, onMount } from 'solid-js';
// import { useStore } from './store';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import useLoop from './hooks/useLoop';
import { IUser } from './models/IUser';
import { RouteNames } from './router';
import { useStore } from './store';

const App: Component = () => {
	const state = useStore();
	const navigate = useNavigate();

	createEffect(() => {
		if (localStorage.getItem('auth')) {
			state.setUser({
				username: localStorage.getItem('username')
			} as IUser);
			state.setIsAuth(true);
			navigate(RouteNames.EVENT, { replace: true });
		}
	});

	return (
		<div>
			<NavBar />
			<Container>
				<AppRouter />
			</Container>
		</div>
	);
};

export default App;
