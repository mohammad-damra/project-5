const connection = require('../db');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
require('dotenv').config();
// Express Functions
const getAllArticles_Express = (req, res) => {
	res.json(articles);
};
const createNewArticle_Express = (req, res) => {
	req.body.id = ++last_ID;
	posts.push(req.body);
	res.json(articles);
};
const changeArticleTitle_Express = (req, res) => {
	for (let i = 0; i < articles.length; i++) {
		if (req.params.id == articles[i].id) {
			articles[i].title = req.params.newTitle;
		}
	}
	res.json(articles);
};
const changeArticleAuthorById_Express = (req, res) => {
	for (let i = 0; i < articles.length; i++) {
		if (req.params.id == articles[i].id) {
			articles[i].author = req.body.newAuthor;
		}
	}
	res.json(articles);
};
const deleteArticleByID_Express = (req, res) => {
	for (let i = 0; i < articles.length; i++) {
		if (req.params.id == articles[i].id) {
			articles.splice(i, 1);
		}
	}
	res.json(articles);
};
const deleteArticleByAuthor_Express = (req, res) => {
	//with filter method
	articles = articles.filter(({ author }) => author !== req.body.author);
	res.json(articles);
	//without filter
	// for (let i = 0; i < articles.length; i++) {
	//   if (req.body.author === articles[i].author) {
	//     articles.splice(i, 1);
	//      i--;
	//   }
	// }
	// res.json(articles);
};
// MySQL Functions

const getAllArticles = (req, res) => {
	const query = `SELECT * FROM articles where is_deleted = 0`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
const createNewArticle = (req, res) => {
	const { title, description, author } = req.body;
	const query = `INSERT INTO articles (title,description,author)
   VALUES ("${title}","${description}","${author}") `;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
const changeArticleTitle = (req, res) => {
	const { id, newTitle } = req.params;
	const query = `UPDATE articles 
  SET 
  title = "${newTitle}"
  where
  id= ${id}`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
const changeArticleAuthorById = (req, res) => {
	const { id } = req.params;
	const { newAuthor } = req.body;
	const query = `UPDATE articles 
  SET 
  author = "${newAuthor}"
  where
  id= ${id}`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
const deleteArticleByID = (req, res) => {
	//Soft Delete
	const { id } = req.params;
	const query = `UPDATE articles 
  SET 
  is_deleted = 1
  where
  id= ${id}`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
	//   //Hard Delete
	//   const { id } = req.params;
	//   const query = `DELETE FROM articles
	//   where id= ${id}`;
	//   connection.query(query, (err, result) => {
	//     if (err) throw err;
	//     res.json(result);
	//   });
};
const deleteArticleByAuthor = (req, res) => {
	const { author } = req.body;
	const query = `UPDATE articles 
  SET 
  is_deleted = 1
  where
  author= "${author}"`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
	// Hard Delete
	// const { author } = req.body;
	// const query = `DELETE FROM articles
	// where author= "${author}"`;
	// connection.query(query, (err, result) => {
	//   if (err) throw err;
	//   res.json(result);
	// });
};
const logIn = (req, res) => {
	const { userName } = req.body;
	const query = `SELECT * FROM users WHERE name ='${userName}'`;
	connection.query(query, async (err, result) => {
		if (err) throw err;
		if (result.length) {
			password = await bcrypt.compare(req.body.password, result[0].password);
			if (password) {
				return res.json('login successfully');
			} else return res.json('Wrong userName or password');
		} else return res.json('Wrong userName or password');
	});
};
const signUp = async (req, res) => {
	const { userName, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
	const data = [ userName, email, hashedPassword ];
	const query = `SELECT * FROM users WHERE name = '${userName}' OR email = '${email}'`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		if (result.length) {
			if (result[0].email === email) {
				res.json('This email is already exist..');
			}
			if (result[0].name === userName) {
				res.json('This userName is already exist..');
			}
		} else {
			const query = `INSERT INTO users (name,email,password) VALUES (?,?,?) `;
			connection.query(query, data, (err, result) => {
				if (err) throw err;
			});
			res.json('Your account has been successfully created.');
		}
	});
};
//Extra End Points.
const getAllArticlesByAuthor = (req, res) => {
	const { author } = req.body;
	const query = `SELECT * FROM articles where is_deleted = 0 AND author="${author}"`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
const changeArticleDescriptionById = (req, res) => {
	const { id } = req.params;
	const { newDescription } = req.body;
	const query = `UPDATE articles 
  SET 
  description = "${newDescription}"
  where
  id= ${id}`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
const recoverDeletedArticleByID = (req, res) => {
	const { id } = req.params;
	const query = `UPDATE articles 
  SET 
  is_deleted = 0
  where
  id= ${id}`;
	connection.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
};
module.exports = {
	getAllArticles,
	createNewArticle,
	changeArticleTitle,
	changeArticleAuthorById,
	deleteArticleByID,
	changeArticleTitle,
	deleteArticleByAuthor,
	getAllArticlesByAuthor,
	changeArticleDescriptionById,
	recoverDeletedArticleByID,
	signUp,
	logIn
};
/*
const login = (req,res)=>{
    const {email}=req.body;
    const query =`SELECT * FROM users WHERE email ='${email}'`
    connection.query(query,async(err,result)=>{
        if(err) throw err;
        //check if there is user with the request data
        if(result.length) {
            password = bcrypt.compare(req.body.password,result[0].password );
            if(password){
                const payload = {
                    id:result[0].id,
                    role_id:result[0].role_id
                };
                const options ={
                    expiresIn:process.env.TOKEN_EXPIRATION
                };
                //putting token to login account
                token =jwt.sign(payload,process.env.SECRET,options);
                res.header('x-auth',token).json(token);
            } else{
                return res.json("Invalid Email or password..");
            }
        }else return res.json("Invalid Email or password..")               
    });
};
*/
