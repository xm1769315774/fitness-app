// 引入对应的css
require("../css/register.less");

document.ready(function () {
    let authStr = '';
    /*不传值，统一走默认值*/
    let captcha1 = new CaptchaMini({
        lineNum: 6,
    });
    captcha1.draw(document.querySelector('#captcha'), r => {
        //  console.log(r, '验证码1');
        authStr = r.toLowerCase();
        //  console.log(authStr);
    });

    // 获取所有元素
    let tellInp = document.querySelector("#tell");
    let authInp = document.querySelector("#auth");
    let pwdInp = document.querySelector("#pwd");
    let pwd1Inp = document.querySelector("#pwd1");
    let btnDom = document.querySelector("#btn");

    // 注册事件
    btnDom.addEventListener("click", function (event) {

        //判断用户是否输入了值
        if (!(tellInp.value && authInp.value && pwdInp.value)) {

            // 点击一次之后将按钮禁用
            this.disabled = true;

            // 两秒后将按钮设置为可以点击
            setTimeout(function () {
                btnDom.disabled = false;
            }, 2000);
            // 提示
            utils.hint(1, "请先将信息补充完整");
            return;
        }
        // 判断手机号格式是否正确
        if (!utils.regTell(tellInp.value)) {

            // 点击一次之后将按钮禁用
            this.disabled = true;

            // 两秒后将按钮设置为可以点击
            setTimeout(function () {
                btnDom.disabled = false;
            }, 2000);
            // 提示
            utils.hint(1, "请输入的正确的手机号");
            return;
        }

        // 判断验证码是否一致
        if (authInp.value.toLowerCase() != authStr) {
            // 点击一次之后将按钮禁用
            this.disabled = true;

            // 两秒后将按钮设置为可以点击
            setTimeout(function () {
                btnDom.disabled = false;
            }, 2000);
            // 提示
            utils.hint(1, "验证码输入错误");
            return;
        }

        // 判断两次输入的密码是否一致
        if (pwdInp.value != pwd1Inp.value) {
            // 点击一次之后将按钮禁用
            this.disabled = true;

            // 两秒后将按钮设置为可以点击
            setTimeout(function () {
                btnDom.disabled = false;
            }, 2000);
            // 提示
            utils.hint(1, "两次输入的密码不一致");
            return;
        }

        // 注册
        let data = {
            account: tellInp.value,
            password: pwdInp.value
        }
        $http.post("/users/add", data, function (res) {
            //    console.log(res);
            if (res.status === 0) {
                // 点击一次之后将按钮禁用
                btnDom.disabled = true;

                // 两秒后将按钮设置为可以点击
                setTimeout(function () {
                    btnDom.disabled = false;
                }, 2000);
                // 提示
                utils.hint(0, "恭喜你！注册成功");
                // 登录
                $http.post("/users/login", data, function (res1) {
                    //将用户信息存储到本地
                    localStorage.setItem("user", JSON.stringify(res1.data.user));
                    // 跳转至首页
                    // 2秒后自动跳转至首页页面
                    let timeId = setTimeout(function () {
                        location.href = "./home.html";
                    }, 2000)
                })
            } else {
                // 点击一次之后将按钮禁用
                btnDom.disabled = true;

                // 两秒后将按钮设置为可以点击
                setTimeout(function () {
                    btnDom.disabled = false;
                }, 2000);
                // 提示
                utils.hint(0, res.msg);
            }

        })

    })


})
