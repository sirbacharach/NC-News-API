const { selectAllTopics } = require("../models/topics.model");


exports.getAllTopics = (req, res) =>{
return selectAllTopics()
.then ((allTopics)=>{
res.status(200).send(allTopics)
})
};