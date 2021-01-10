const express = require('express')

var router = express.Router();
// 要引入 user的数据库架构完成的状态
const user = require('../sql/user');


router.get('/', function (req, res, next) {
    console.log('现在进入登录了');
    res.render('login');
    
});

// 请求登录
router.post('/in', function (req, res, next) {
    // 拿到用户名和密码
    let obj = req.body;
    // console.log(obj);
    // 确认用户名和密码是否正确
    user.findOne(obj, (err,data) => {
        if (err) {
            console.log('err',err);
        }
        if (data) {

            console.log('登陆成功');
            // res.cookie ('isLogin', 'ok');
            req.session.isLogin = 'ok';
            res.redirect('/pro');
        } else {
            // 跳转到注册
            res.redirect("register")
        }
    })
})





module.exports = router;