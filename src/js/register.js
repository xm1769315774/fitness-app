// 引入对应的css
require("../css/register.less");

document.ready(function(){
let authStr='';
 /*不传值，统一走默认值*/
 let captcha1 = new CaptchaMini({
    lineNum: 6,  
 });
 captcha1.draw(document.querySelector('#captcha'), r => {
    //  console.log(r, '验证码1');
     authStr=r.toLowerCase();
    //  console.log(authStr);
 });

// 获取所有元素
let tellInp=document.querySelector("#tell");
let authInp=document.querySelector("#auth");
let pwdInp=document.querySelector("#pwd");
let pwd1Inp=document.querySelector("#pwd1");
let btnDom=document.querySelector("#btn");


// 注册事件
btnDom.addEventListener("click",function(event){
    // 注销事件
    // btnDom.removeEventListener();
//判断用户是否输入了值
if(!(tellInp.value && authInp.value && pwdInp.value)){
    // 提示
    utils.hint(1,"请先将信息补充完整");
    return;
}
// 判断手机号格式是否正确
if(!utils.regTell(tellInp.value)){
    // 提示
    utils.hint(1,"请输入的正确的手机号");
    return;
}

// 判断验证码是否一致
if(authInp.value.toLowerCase()!=authStr){
    // 提示
    utils.hint(1,"验证码输入错误");
    return;
}

// 判断两次输入的密码是否一致
if(pwdInp.value!=pwd1Inp.value){
     // 提示
     utils.hint(1,"两次输入的密码不一致");
     return;
}

// 注册
let data={
    account:tellInp.value,
    password:pwdInp.value
}
$http.post("/users/add",data,function(res){
     // 提示
     utils.hint(0,"恭喜你！注册成功");
    // 2秒后自动跳转至登录页面
    let timeId=setTimeout(function(){
        location.href="../login.html";
    },2000)
})
  
})


})
