import React from 'react';
// import axios from 'axios';

export default function ArticleItem(props) {
	return (
		<div className="sign-up">
			<h1>SignUp</h1>
			<label>UserName : </label>
			<input type="text" placeholder="Username" />
			<br />
			<br />
			<label>email : </label>
			<input type="email" placeholder="email" />
			<br />
			<br />
			<label>Password : </label>
			<input type="password" placeholder="Password" />
			<br />
			<br />
			<button>SignUp</button>
			<br />
			<br />
			<button onClick={() => {}}>Clear</button>
			<br />
			<br />
			<a href="http://localhost:3000/login">login page</a>
		</div>
	);
}
