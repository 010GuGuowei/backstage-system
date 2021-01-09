var express = require('express');
var router = express.Router();
const staff = require('../sql/staff');


// 渲染员工信息的页面
router.get('/', function (req, res, next) {
    staff.find({}, (err, data) => {
      if (err) {
        console.log('报错了',err)
      }
      console.log(data)
  
      res.render('staff', {
        index: 3,
        data: data
      });
    })
  
});
  

// 渲染添加员工信息的页面
router.get("/add", function (req, res, next) {
  res.render("staffAdd", {
    index: 2,
  });
});


// 添加员工信息
router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;
  //调用方法转数字
  obj.age = obj.age - 0;
  obj.telephone = obj.telephone - 0;
  obj.salary = obj.salary - 0;
  // obj.pass = obj.pass - 0;
  console.log(obj);
  staff.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/staff");
  })
});



// 修改员工信息的页面
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);

  staff.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    // console.log(data)
    console.log(data._id)
    res.render('staffUpdate', {
      index: 3,
      data: data
    })
  })


});

// 修改操作 - 更新数据
router.post("/updateStaff", function (req, res, next) {
  console.log('我在/updateStaff里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  obj.age = Number(obj.age);
  obj.telephone = obj.telephone - 0;
  obj.salary = obj.salary - 0;
  // obj.score = obj.score * 1;
  console.log('obj_id', obj)
  staff.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/staff");

  })
});


// 删除员工信息
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log('我现在进入/staffDelete里面了')
  console.log(req.query)

  staff.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/staff");
  })
});


// 查询员工信息
router.get("/search", (req, res, next) => {
  console.log("进入到员工信息查询")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  staff.find({ name: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("staff", {
      index: 2,
      data,
    });
  })
});


// 工资排序
//sort 排序
router.get("/sort1", (req, res, next) => {
  const obj = req.query;
  staff.find({}).sort({ salary: 1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("staff", {
      index: 3,
      data,
    })
  })

});


router.get("/sort2", (req, res, next) => {
  const obj = req.query;
  staff.find({}).sort({ salary: -1 }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("staff", {
      index: 3,
      data,
    })
  })

});



module.exports = router;
