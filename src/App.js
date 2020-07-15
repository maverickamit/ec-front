import React from 'react';
import './App.css';
import UserRegistration from './components/registration/registration';
import UserLogin from './components/login/login';
import UserProfile from './components/profile/profile';
import NavigationBar from './components/navigation/navigation';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';

function App({ userStore }) {
	return (
		<Router>
			<div className="container">
				<NavigationBar userStore={userStore} />
				<Route path="/" exact component={(props) => <UserLogin {...props} userStore={userStore} />} />
				<Route
					path="/registration"
					exact
					component={(props) => <UserRegistration {...props} userStore={userStore} />}
				/>
				<Route path="/profile" exact component={(props) => <UserProfile {...props} userStore={userStore} />} />
			</div>
		</Router>
	);
}

export default observer(App);
