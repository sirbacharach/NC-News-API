const { selectAllTopics } = require("../models/topics.model");

exports.getAllTopics = (req, res, next) =>{
return selectAllTopics()
.then ((allTopics)=>{
res.status(200).send(allTopics)
})
.catch(next)
};