/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import { App } from './App.tsx';
import 'solid-devtools';

render(() => <App />, document.getElementById('root')!)
