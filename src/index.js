import React from 'react';
import ReactDOM from 'react-dom';
import 'mobx-react/batchingForReactDom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserStore } from './store';
import { create } from 'mobx-persist';

const userStore = new UserStore();
const hydrate = create({});

hydrate('ecAppState', userStore).then(() => console.log('ecAppState hydrated'));
// hydrate("noDecoratorState", noDecoratorState).then(() =>
//   console.log("noDecoratorState hydrated")
// );

ReactDOM.render(
	<React.StrictMode>
		<App userStore={userStore} />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
