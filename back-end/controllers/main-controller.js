const connection = require("../db");
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
};
