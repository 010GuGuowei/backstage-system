const express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const user = require('../sql/user')

router.get('/', function (req, res, next) {
    console.log('此时进入了注册的/里面了')

    res.render("register")
});

router.post('/in', function (req, res, next) {
    console.log('现在进入register/in里面了');
    // 拿到请求发送的数据
    let obj = req.body;
    // console.log(obj);
    // 查询数据
    user.findOne({ username: obj.username }, (err, data) => {
        console.log('现在到注册中的查询了');
        if (err) {
            console.log(err);
        }
        if (data) {         // 用户名已存在则重新返回注册页面
            res.render("register")

        } else {        // 不存在则写入数据,跳转到登录页面
            user.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
                res.redirect("/login");
            });

        }
    });
})


module.exports = router;