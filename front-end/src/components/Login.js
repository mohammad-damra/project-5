import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArchiveIcon, ArrowRightIcon } from '@primer/octicons-react';
import axios from 'axios';

export default function Login(props) {
	const [ userName, setUserName ] = useState('');
	const [ Password, setPassword ] = useState('');
	const [ error, setError ] = useState('');
	const history = useHistory();
	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const clearForm = () => {
		setPassword('');
		setUserName('');
		setError('');
	};
	const submit = () => {
		setError('');
		if (userName.length < 3) {
			setError('username is required !');
			return;
		}
		axios.post('http://localhost:5000/login', { userName, Password }).then((data) => {
			console.log('object :>>', data.data);
			if (data.data != 'Wrong userName or password') {
				history.push('/articles');
			} else {
				setError('Wrong userName Or Password !');
			}
		});
	};
	return (
		<div className="container">
			<div className="row">
				<h4 className="text-primary">Login</h4>
			</div>
			<div className="row">
				<div className="col-md-6">
					<label htmlFor="userName" className="text-info">username :</label>
					<input
						id="I1"
						type="text"
						id="userName"
						className="form-control"
						value={userName}
						onChange={handleUserNameChange}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<label id="I2" htmlFor="password" className="text-info">
						password :
					</label>
					<input
						type="password"
						id="password"
						className="form-control"
						value={Password}
						onChange={handlePasswordChange}
					/>
				</div>
			</div>
			<div className="row" style={{ marginTop: '20px' }}>
				<div className="col-md-6">
					<button
						id="B1"
						style={{ width: '100%' }}
						type="button"
						className="btn btn-outline-primary"
						onClick={submit}
					>
						Login
					</button>
				</div>
			</div>
			<div className="row" style={{ marginTop: '20px' }}>
				<div className="col-md-6">
					<button
						id="B2"
						style={{ width: '100%' }}
						type="button"
						className="btn btn-outline-danger"
						onClick={clearForm}
					>
						Clear <ArchiveIcon size={16} />{' '}
					</button>
				</div>
			</div>
			<div className="row" style={{ marginTop: '20px', textAlign: 'center', color: 'blue', cursor: 'pointer' }}>
				<div className="col-md-6">
					<Link to="/signUp">
						SignUp<ArrowRightIcon size={16} />
					</Link>
				</div>
			</div>
			{error.length > 0 && (
				<div className="row" style={{ marginTop: '20px' }}>
					<div className="col-md-6">
						<div className="alert alert-warning" role="alert">
							{error}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
