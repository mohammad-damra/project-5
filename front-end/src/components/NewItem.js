import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';
import {BrowserRouter as Link} from 'react-router-dom'

export default function NewItem(props) {
	const [ title, setTitle ] = useState('');
	const [ desc, setDesc ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ weather, setWeather ] = useState('');
	const [ articles, setArticles ] = useState([]);
	useEffect(() => {
		getWeather();
		getAllArticles();
	}, []);
	const getWeather = () => {
		axios
			.get(`http://localhost:5000/weather`)
			.then((response) => {
				setWeather(response.data);
				console.log('response :', response.data);
			})
			.catch((err) => {
				console.log('ERROR :', err);
			});
	};
	const addNewArticle = () => {
		axios
			.post(`http://localhost:5000/articles`, {
				title: title,
				description: desc,
				author: author
			})
			.then((response) => {
				console.log('RESPONSE: ', response);
				console.log('DATA: ', response.data);
				if (response.status === 200) {
					getAllArticles();
				}
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	};
	const getAllArticles = () => {
		axios
			.get(`http://localhost:5000/articles`)
			.then((response) => {
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
		<div className="new-item">
			<h1>WELCOME</h1>
			<div>{weather && weather.name}</div>
			<input
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				type="text"
				placeholder="article title ..."
			/>
			<br />
			<textarea
				onChange={(e) => {
					setDesc(e.target.value);
				}}
				rows="4"
				cols="50"
				placeholder="article description ..."
			/>
			<br />
			<input
				onChange={(e) => {
					setAuthor(e.target.value);
				}}
				type="text"
				placeholder="article author ..."
			/>
			<br />
			<button onClick={addNewArticle}>Add New Article</button>
			<button onClick={getAllArticles}>GET ARTICLES</button>
			{renderArticles}
		</div>
	);
}

