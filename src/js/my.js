// 引入对应的css
require("../css/my.less");

document.ready(function(){
    
    // 获取所有的元素
    let quitDom=document.querySelector(".quit");

    // 注册事件点击退出登录
    quitDom.addEventListener("click",function(event){

        localStorage.removeItem("user");
        // 提示
        utils.hint(0,"已成功退出登录");
        // 跳转至登录页
        location.href="./login.html";
    })

    // 引入公共页脚
    utils.addFooter("my");


})