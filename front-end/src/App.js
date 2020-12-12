import React, { useState } from 'react';
import NewItem from './components/NewItem';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ArticleItem from './components/ArticleItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import './App.css';

import axios from 'axios';

export default function App() {
	const [ articles, setArticles ] = useState([]);

	const getAllArticles = () => {
		axios
			.get(`http://localhost:5000/articles`)
			.then((response) => {
				// console.log('RESPONSE: ', response);
				console.log('DATA: ', response.data);
				setArticles(response.data);
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	};
	const renderArticles = articles.map((articleObj) => {
		return <ArticleItem article={articleObj} getArticles={getAllArticles} />;
	});

	return (
		<Router>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/articles">
				<div className="home">
					<h1>WELCOME</h1>
					<button onClick={getAllArticles}>GET ARTICLES</button>
					<NewItem getArticles={getAllArticles} />
					{renderArticles}
				</div>
			</Route>
			<Route path="/signUp">
				<SignUp />
			</Route>
		</Router>
	);
}
