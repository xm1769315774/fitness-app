// 引入对应的css
require("../css/my.less");

document.ready(function () {

    // 引入公共页脚
    utils.addFooter("my");


    // 获取所有的元素
    let quitDom = document.querySelector(".quit");
    let imgHeadDom = document.querySelector(".imgHead");
    let nicknameDom = document.querySelector("#nickname");
    let signDom = document.querySelector("#sign");
    let timesDom = document.querySelector("#times");
    let calorieDom = document.querySelector("#calorie");
    let headDom = document.querySelector(".head");
    let pictureDom = document.querySelector(".picture");
    let uploadDom = document.querySelector("#upload");


    // 获取本地存储的数据，渲染页面
    let user = JSON.parse(localStorage.getItem("user"));


    // 将从后端拿获取数据修改个性信息封装为函数

    function changeInfor() {
        // 请求接口获取头像的src地址
        $http.get("/users/accountinfo?userId=" + user.userId, function (res) {
            console.log(res);
            // 渲染数据
            // 判断是否有头像信息
            if (res.data.imgurl) {
                imgHeadDom.src = res.data.imgurl;
            };

            // 判断用户名
            if (res.data.nickname) {
                nicknameDom.textContent = res.data.nickname;
            };

            // 判断个性签名
            if (res.data.sign) {
                signDom.textContent = res.data.sign;
            };
        })
    };
    // 调用函数更新一下个人信息
    changeInfor();





    // 请求接口，渲染运动数据
    $http.get("/users/mysportsBadge?userId=" + user.userId, function (res) {
        // 渲染
        timesDom.textContent = res.data.sports.times;

        calorieDom.textContent = res.data.sports.calorie;

    })

    // 注册事件，跳转至个人信息页面
    headDom.addEventListener("click", function (event) {
        location.href = "./information.html";
    })

    // 注册事件点击头像更换头像
    pictureDom.addEventListener("click", function (event) {
        // 阻止事件冒泡
        event.stopPropagation();

        // 触发上传头像的点击事件
        uploadDom.click();
    });
    const BASE_URL = 'http://139.9.177.51:8099'; // 接口请求的 URL
    // 注册事件
    uploadDom.addEventListener("change", function (event) {
        // 阻止事件冒泡
        event.stopPropagation();
        // 发送文件
        $updateFile(BASE_URL + "/users/upload", "imgurl", this.files[0], function (event) {

            // 更换用户头像
            imgHeadDom.src = BASE_URL + event.data;
            let url = BASE_URL + event.data;

            updateHead(url);

            // 封装函数将头像给后端
            function updateHead(url) {

                // 上传数据userId为必传项
                let data = {
                    userId: user.userId,
                    imgurl: url
                };

                $http.post("/users/userEdit", data, function (res) {
                    // 判断
                    if (res.status === 0) {
                        // 提示
                        utils.hint(0, "修改头像成功");
                        // 再次调用函数更新一下个人信息
                        changeInfor();

                    }

                })
            }

        });
    })




    // 注册事件点击退出登录
    quitDom.addEventListener("click", function (event) {

        localStorage.removeItem("user");
        // 提示
        utils.hint(0, "已成功退出登录");
        // 跳转至登录页
        location.href = "./login.html";
    })



})