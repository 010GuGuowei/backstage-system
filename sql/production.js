//test是一个测试文件 不要在项目中使用  


  
const db = require('./db.js')
 
// 类似于lol 中的六神装 不能七神装的数据管理 fdsfsdfsdfsdf
const productionSchema = new db.mongoose.Schema ({
    "proName":{type:String},
    "column":{type:String},
    "brand":{type:String},
    "logo":{type:String},
    "price":{type:String},
    "proImg":{type:String},
    "introduce":{type:String},
    "stock":{type:Number},
    "discount":{type:Number},
    "score":{type:Number}
})

 
module.exports = db.mongoose.model("production",productionSchema)
