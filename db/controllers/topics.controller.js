const { selectAllTopics, selectAllArticles } = require("../models/topics.model");


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