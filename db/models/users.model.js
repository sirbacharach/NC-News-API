const db = require("../connection")

exports.selectAllUsers = () =>{
    console.log("you are in model")
return db.query(``).then(({rows})=>{
    return rows;
});
};