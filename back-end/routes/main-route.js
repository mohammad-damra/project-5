const express = require("express");
const mainRouter = express.Router();
const {
  getAllArticles,
  createNewArticle,
  changeArticleTitle,
  changeArticleAuthorById,
  deleteArticleByID,
  deleteArticleByAuthor,
  getAllArticlesByAuthor,
  changeArticleDescriptionById,
  recoverDeletedArticleByID
} = require("../controllers/main-controller");

mainRouter.get("/articles", getAllArticles);
mainRouter.post("/articles", createNewArticle);
mainRouter.delete("/articles/:id", deleteArticleByID);
mainRouter.put("/articles/:id/:newTitle", changeArticleTitle);
mainRouter.put("/articles/:id", changeArticleAuthorById);
mainRouter.delete("/articles", deleteArticleByAuthor);
//extra End points
mainRouter.get("/articlesByAuthor", getAllArticlesByAuthor);
mainRouter.put("/articlesDescription/:id", changeArticleDescriptionById);
mainRouter.get("/recoverArticles/:id", recoverDeletedArticleByID);
module.exports = mainRouter;


/*
CREATE TABLE users (
    user_id int AUTO_INCREMENT NOT NULL,
    email varchar(50),
    password int(25),
    PRIMARY KEY (user_id), 
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
);
ALTER TABLE articles
FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE articles
DROP COLUMN user_id;
ALTER TABLE articles
ADD FOREIGN KEY (userId) REFERENCES users(user_id);
*/