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
                    return console.log(res.message);
                }
                else {
                    console.log('注册成功')

                }
            }

        })




    })



    /* 
    $('#form_log').on('submit',function(e){
        e.preventDefault()
    
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/api/login',
            // 这里是需要获取一下html页面中用户输入的值的
            data:{
                username: $('#form_log [name=username]').val(),
                password: $('#form_log [name=password]').val()
            },
            success:function(res){
                if(res.status===1){
                    console.log('登录成功')
                }
                else  {
                    return  console.log(res.message);    
                }
                
            }
        
        })
    
    })
     */


    // ++++++++++++++++++++++++++++++++++++
    // 给注册按钮设置点击事件









})


