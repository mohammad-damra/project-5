import React, { useState } from 'react';
import axios from 'axios';

export default function ArticleItem(props) {
	const { title, description, author, id } = props.article;
	const [ newAuthor, setAuthor ] = useState('');
	const deleteArticle = () => {
		axios
			.delete(`http://localhost:5000/articles/${id}`)
			.then((response) => {
				if (response.status === 200) {
					props.getArticles();
				}
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	};
	const changeAuthor = () => {
		axios
			.put(`http://localhost:5000/articles/${id}`, { newAuthor: newAuthor })
			.then((response) => {
				if (response.status === 200) {
					props.getArticles();
				}
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	};

	return (
		<div className="article-item">
			<h3>TITLE: {title}</h3>
			<p>{description}</p>
			<p className="author">BY: {author}</p>

			<input
				onChange={(e) => {
					setAuthor(e.target.value);
				}}
				type="text"
				placeholder="article new author ..."
			/>
			<button onClick={changeAuthor}>Update current author</button>

			<button onClick={deleteArticle}>X</button>
		</div>
	);
}
