// jq的入口函数
$(function () {

    // 这是要设置点击去注册账号a的功效,监听到后跳转页面并显示
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // ++++++++++++++++++++++++++++++++++++++++++++
    // 从layui身上获取form对象是什么意思????
    // 因为form身上有方法(实在自定义规则的上面提示的: 通过 form.verify 来自定义校验规则)
    let form = layui.form
    let layer = layui.layer


    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 因为在设定上面的规则后,页面在运行时再次确认密码框虽然密码不一致,但是再浏览器地址中还会被再次提交,是所以要直接再这里设定两密码是否一致的规则


        // 这里通过形参拿到的是确认密码框中的内容
        // 但是还需要登录密码的内容
        // 两个结果进行一次等于判断
        // 如果失败则return一个提示消息
        repwd: function (value) {

            let pwd = $('.reg-box [name=password]').val()

            if (value !== pwd) return '两次密码不一致哦'

        }
    });

    //  ++++++++++++++++++++++++++++++++++++++++   
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        console.log($('#form_reg [name=username]').val());
        $.ajax({
            method: 'POST',
            // url:'http://big-event-vue-api-t.itheima.net/api/reg',
            url: 'http://big-event-api-t.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
                // repassword: $('#form_reg [name=repassword]').val(),
            },
            success: function (res) {
                // console.log(res);
                console.log(res.data);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                else {
                    layer.msg('注册成功')
                    // 模拟人的点击行为
                    $('#link_login').click()
                }
            }

        })




    })





    // 监听登录表单提交事件
    
    $('#form_log').submit(function (e) {
        e.preventDefault()
        console.log($('#form_log [name=username]').val());
        $.ajax({
            method: 'POST',
            // url:'http://big-event-vue-api-t.itheima.net/api/reg',
            url: 'http://big-event-api-t.itheima.net/api/login',

            // 快速获取表单数据,比手动拼接更方便
            data: $(this).serialize(),

            success: function (res) {
                // console.log(res);
                console.log(res.data);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                 layer.msg('登录成功')
                 console.log(res.token);
                //  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI3NCwidXNlcm5hbWUiOiJlZW0iLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2NTgxNzYxMCwiZXhwIjoxNjY1ODUzNjEwfQ.0dUTqzjy032mYrptprKRmbbQv2tIF7TFv9_3svkIESo
                // 这个token值相当于一个身份正,可以在登录成功后保存到本地,以便在其他权限 接口中使用操作
                localStorage.setItem('token',res.token)
                // location.href='/index.html'

            }

        })




    })








})


