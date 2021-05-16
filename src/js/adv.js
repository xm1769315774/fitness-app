// 引入adv对应的css
require("../css/adv.less");

//获取元素
let spanDom=document.querySelector(".down");
let markDom=document.querySelector(".mark");

let num=5;

// 开启定时器
function count(){
    spanDom.innerHTML=num+"s";
    num--;
    // 判断当num倒计时为0时，清除定时器。跳转页面
    if(num<0){
        clearInterval(timeId);//清除定时器
       location.href="../login.html";//跳转至登录页面
    }
}

// 设置定时器，每隔一秒运行一次
let timeId=setInterval(count,1000);