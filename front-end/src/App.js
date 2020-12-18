import React from 'react';
import NewItem from './components/NewItem';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
export default function App() {

	

	return (
		<BrowserRouter>
			<Switch>
				<Router>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>
					<Route path="/login" component={Login} />
					<Route exact path="/articles" component={NewItem}/>
					<Route path="/signUp" component={SignUp} />
				</Router>
			</Switch>
		</BrowserRouter>
	);
}
