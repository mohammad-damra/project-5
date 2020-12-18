import React, { useState, useEffect } from 'react';
import { ArchiveIcon, ArrowRightIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NewItem(props) {
	const [ error, setError ] = useState('');
	const [ search, setSearch ] = useState('');
	const [ articales, setArticales ] = useState([]);
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ allArticales, setAllArticales ] = useState([]);
	const [ weather, setWeather ] = useState('');

	useEffect(() => {
		getAllArticles();
		getWeather();
	}, []);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		if (e.target.value == '') {
			setArticales([ ...allArticales ]);
			return;
		}
		setArticales(
			articales.filter((value) => {
				return value.title.indexOf(search) != -1;
			})
		);
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleAuthorChange = (e) => {
		setAuthor(e.target.value);
	};

	const getAllArticles = () => {
		axios.get('http://127.0.0.1:5000/articles').then((res) => {
			setAllArticales(res.data);
			setArticales(res.data);
		});
	};

	const getWeather = () => {
		axios.get('http://127.0.0.1:5000/weather').then((res) => {
			console.log(res.data);
			setWeather(res.data);
		});
	};

	const clearForm = () => {
		setError('');
		setTitle('');
		setDescription('');
		setAuthor('');
	};

	const add = () => {
		setError('');
		if (title === '' || description === '' || author === '') {
			setError('all fields is requerad !');
			return;
		}
		const obj = {
			title,
			description,
			author
		};

		axios.post('http://localhost:5000/articles', obj).then((res) => {
			const id = res.data.insertId;
			obj.id = id;
			setArticales([ ...articales, obj ]);
			setAllArticales([ ...allArticales, obj ]);
			clearForm();
		});
	};

	const remove = (id) => {
		axios.delete('http://localhost:5000/articles/' + id).then((res) => {
			const array = allArticales.filter((value, i) => {
				return id != value.id;
			});
			setAllArticales(array);
			setArticales(array);
		});
	};

	const fav = (value) => {
		const fav = value.fav === 1 ? 0 : 1;
		axios.post('http://127.0.0.1:5000/fav', { id: value.id, fav }).then((res) => {
			getAllArticles();
		});
	};
	return (
		<div className="container">
			<nav className="navbar navbar-expand-md navbar-light bg-light">
				<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarCollapse">
					<div className="navbar-nav">
						<a href="#" className="nav-item nav-link active">
							Home
						</a>
					</div>
					<div className="navbar-nav ml-auto">
						<Link to="/login">
							Logout<ArrowRightIcon size={16} />
						</Link>
					</div>
				</div>
			</nav>

			<div className="row">
				{weather && (
					<div
						className="col-md-8 "
						style={{ marginTop: '50px', marginLeft: '300px', marginBottom: '100px', color: 'blue' }}
					>
						Country: {weather.name} / Temp: {weather.main.temp} / Weather: {weather.weather[0].description}
					</div>
				)}
			</div>

			<div className="row">
				<div className="col-md-8 " style={{ marginTop: '50px', marginLeft: '150px', marginBottom: '100px' }}>
					<input
						id="I1"
						type="text"
						placeholder="Search..."
						id="search"
						className="form-control"
						value={search}
						onChange={handleSearchChange}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-3 ">
					<input
						id="I1"
						type="text"
						placeholder="title..."
						id="title"
						className="form-control"
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				<div className="col-md-3 ">
					<input
						id="I1"
						type="text"
						placeholder="description..."
						id="description"
						className="form-control"
						value={description}
						onChange={handleDescriptionChange}
					/>
				</div>
				<div className="col-md-3 ">
					<input
						id="I1"
						type="text"
						placeholder="author..."
						id="author"
						className="form-control"
						value={author}
						onChange={handleAuthorChange}
					/>
				</div>

				<div className="col-md-3">
					<button id="B2" style={{ width: '100%' }} type="button" className="btn btn-primary" onClick={add}>
						Add{' '}
					</button>
				</div>
			</div>

			<div className="row" style={{ marginTop: '5rem', marginBottom: '10px' }}>
				{articales.map((value, i) => {
					return (
						<div className="col-md-3" style={{ marginLeft: '1%' }} key={i}>
							<div className="card" style={{ width: '18rem' }}>
								<div className="card-body">
									<h5 className="card-title">{value.title}</h5>
									<h6 className="card-subtitle mb-2 text-muted">{value.author}</h6>
									<p className="card-text">{value.description}</p>
									<button
										id="B3"
										style={{ width: '100%' }}
										type="button"
										className="btn btn-danger"
										onClick={() => {
											remove(value.id);
										}}
									>
										Delete{' '}
									</button>
									<button
										id="B4"
										style={{ width: '100%', marginTop: '10px' }}
										type="button"
										className="btn btn-primary"
										onClick={() => {
											fav(value);
										}}
									>
										{value.fav == 1 && 'Add To Favorate'}
										{value.fav == 0 && 'Remove To Favorate'}
										add to favorite
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{error.length > 0 && (
				<div className="row" style={{ marginTop: '20px' }}>
					<div className="alert alert-warning" role="alert" style={{ width: '100%' }}>
						{error}
					</div>
				</div>
			)}
		</div>
	);
}
/*

 */
/*
import React, { useState, useEffect } from 'react';
import { ArchiveIcon, ArrowRightIcon } from '@primer/octicons-react';
import axios from 'axios';
import ArticleItem from './ArticleItem';
import { BrowserRouter as Link } from 'react-router-dom';

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
*/
