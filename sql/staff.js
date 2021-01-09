
const db = require('./db.js')

const staffInfo = new db.mongoose.Schema({
    "name": { type: String },
    "sex": { type: String },
    "age": { type: Number },
    "salary": { type: Number },
    "telephone": { type: Number },
    "department": { type: String },

})






module.exports = db.mongoose.model("staff", staffInfo)