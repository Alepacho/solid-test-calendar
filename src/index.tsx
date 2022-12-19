/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { createContext } from 'solid-js';
import { useStore } from './store';
import './index.css';
import App from './App';

const { Provider } = createContext();

render(() => (
    <Provider value={useStore}>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root') as HTMLElement);
