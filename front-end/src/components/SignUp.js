import React, { useState } from 'react';
import { ArchiveIcon, ArrowRightIcon } from '@primer/octicons-react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
export default function SignUp(props) {
	const [ userName, setUserName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ error, setError ] = useState('');
	const history = useHistory();
	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const clearForm = () => {
		setPassword('');
		setUserName('');
		setEmail('');
		setError('');
	};
	const submit = () => {
		setError('');
		if (userName.length < 3) {
			setError('username is required !');
			return;
		}
		axios.post('http://localhost:5000/signup', { userName, email, password }).then((data) => {
			if (data.data == 'Your account has been successfully created.') {
				history.push('/login');
			} else {
				setError('The userName Or the email is already used ..!');
			}
		});
	};
	return (
		<div className="container">
			<div className="row">
				<h4>SignUp</h4>
			</div>
			<div className="row">
				<div className="col-md-6">
					<label htmlFor="userName">username</label>
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
					<label id="I2" htmlFor="password">
						password
					</label>
					<input
						type="password"
						id="password"
						className="form-control"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<label id="I2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="form-control"
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
			</div>
			<div className="row" style={{ marginTop: '20px' }}>
				<div className="col-md-6">
					<button
						id="B1"
						style={{ width: '100%' }}
						type="button"
						className="btn btn-success"
						onClick={submit}
					>
						SignUp
					</button>
				</div>
			</div>
			<div className="row" style={{ marginTop: '20px' }}>
				<div className="col-md-6">
					<button
						id="B2"
						style={{ width: '100%' }}
						type="button"
						className="btn btn-danger"
						onClick={clearForm}
					>
						Clear <ArchiveIcon size={16} />{' '}
					</button>
				</div>
			</div>
			<div className="row" style={{ marginTop: '20px', textAlign: 'center', color: 'blue', cursor: 'pointer' }}>
				<div className="col-md-6">
					<Link to="/login">
						Login<ArrowRightIcon size={16} />
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
