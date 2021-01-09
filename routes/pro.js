var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const production = require("../sql/production");
/* GET home page. */
router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板

  production.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render("pro", {
      index: 1,
      data: data
    })
  })

});

router.get("/add", function (req, res, next) {
  res.render("proAdd", {
    index: 1,
  });
});




router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;
  //调用方法转数字
  obj.price = Number(obj.price);
  //隐形转换
  obj.discount = obj.discount - 0;
  //隐形转换
  obj.score = obj.score * 1;
  console.log(obj);
  production.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/pro");
  })

});

//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log('我现在进入/delete里面了')
  console.log(req.query)

  production.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/pro");
  })

  // production.findOneAndRemove({'_id' : req.query._id},(err,data)=>{
  //    if(err) {
  //      console.log(err)
  //    }
  //    console.log(data)
  //    res.redirect("/pro");
  // })


  //   production.findOneAndDelete({'_id' : req.query._id},(err,data)=>{
  //     if(err) {
  //       console.log(err)
  //     }
  //     console.log(data)
  //     res.redirect("/pro");
  //  })

});

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);

  production.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('proUpdate', {
      index: 1,
      data: data
    })
  })


});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  obj.price = Number(obj.price);
  obj.stock = parseFloat(obj.stock);
  obj.discount = obj.discount - 0;
  obj.sales = obj.sales - 0;
  obj.score = obj.score * 1;
  console.log('obj_id', obj)
  production.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/pro");

  })


});

//sort 排序
router.get("/sort1", (req, res, next) => {
  const obj = req.query;
  production.find({}).sort({ price: 1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    })
  })

});

router.get("/sort2", (req, res, next) => {
  const obj = req.query;
  production.find({}).sort({ price: -1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    })
  })

});

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  production.find({ proName: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("pro", {
      index: 1,
      data,
    });
  })


});

module.exports = router;
