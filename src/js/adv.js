// 引入adv对应的css
require("../css/adv.less");

document.ready(function(event){

    //获取元素
let spanDom = document.querySelector(".down");
let markDom = document.querySelector(".mark");
let countDom = document.querySelector(".count");

let num = 5;

// 开启定时器
function count() {
    spanDom.innerHTML = num + "s";
    num--;
    // 判断当num倒计时为0时，清除定时器。跳转页面
    if (num < 0) {
        clearInterval(timeId);//清除定时器
        // 判断本地存储是否有数据
        if (localStorage.getItem("user")) {//如果本地存储里边有账号
            location.href = "./home.html";//跳转至首页页面
        } else {
            location.href = "./login.html";//跳转至登录页面
        }
    }
}

// 设置定时器，每隔一秒运行一次
let timeId = setInterval(count, 1000);

// 跳转至登录页面
countDom.addEventListener("click", function (event) {
    // 判断本地存储是否有数据
    if (localStorage.getItem("user")) {//如果本地存储里边有账号
        location.href = "./home.html";//跳转至首页页面
    } else {
        location.href = "./login.html";//跳转至登录页面
    }

})


})
