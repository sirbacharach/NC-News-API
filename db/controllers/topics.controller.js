const { selectAllTopics } = require("../models/topics.model");
const { selectAllArticles } = require("../models/articles.model");

exports.getAllTopics = (req, res, next) =>{
return selectAllTopics()
.then ((allTopics)=>{
res.status(200).send(allTopics)
})
.catch(next)
};

exports.getAllArticles = (req, res, next) => {
return selectAllArticles()
.then((allArticles) => {
    res.status(200).send({allArticles})
})
};
