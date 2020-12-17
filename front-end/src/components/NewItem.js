import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NewItem(props) {
	const [ title, setTitle ] = useState('');
	const [ desc, setDesc ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ weather, setWeather ] = useState('');
	useEffect(() => {
		getWeather();
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
					props.getArticles();
				}
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	};

	return (
		<div className="new-item">
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
		</div>
	);
}
