// 引入对应的css
require("../css/login.less");

// 获取所有元素
let usernameInp=document.querySelector("#username");
let pwdInp=document.querySelector("#pwd");
let loginBtn=document.querySelector("#loginBtn");

// 注册事件
loginBtn.addEventListener("click",function(event){
    // 判断用户是否输入了内容
    if(!(usernameInp.value && pwdInp.value)){
     // 提示
     utils.hint(1,"请输入完整的账号密码");
     return;
    }
    // 判断用户名是否符合要求
    if(!utils.regTell(usernameInp.value)){
        utils.hint(1,"请输入正确的用户名");
        return;
    }
   

    // 登录
    let data={
        account:usernameInp.value,
        password:pwdInp.value
    };
    $http.post("/users/login",data,function(res){
        console.log(res);

    // 判断密码是否正确
    if(res.msg!="OK"){
        utils.hint(1,"请输入正确的密码");
        return;
    }
    //提示登录成功
    utils.hint(0,"登录成功");
    // 将用户信息存储到本地永久级存储中
    
    let uesr=res.data.uesr;
    localStorage.setItem("user",JSON.stringify(uesr));
    let timeId=setTimeout(function(){
        location.href="../home.html";
    },2000)
    })
})
