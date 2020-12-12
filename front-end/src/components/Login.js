import React from 'react';
// import axios from 'axios';

export default function ArticleItem(props) {
	return (
		<div className="login">
			<h1>Login</h1>
			<label>UserName : </label>
			<input type="text" placeholder="Username" />
			<br />
			<br />
			<label>Password : </label>
			<input type="password" placeholder="Password" />
			<br />
			<br />
			<button>Login</button>
			<br />
			<br />
			<button>Clear</button>
			<br />
			<br />
			Don't have an account signUp <a href="http://localhost:3000/signup">here</a>
		</div>
	);
}
