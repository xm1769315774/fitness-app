/**
 * 工具函数
 */



let utils={};

// 正则验证手机号格式
utils.regTell=function(tell){
    let reg=/^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(tell);
}

// 提示弹框
utils.hint=function(status,msg){
    let hint=document.createElement("div");
    hint.className="box";
    let html=`
    <i class="icon1 iconfont icon-gantanhao"></i>
    <p class="text">${msg}</p>
    `;
    if(status===0){
        html=`
        <i class="icon1 iconfont icon-gougou"></i>
        <p class="text">${msg}</p>
        `;
    }
    hint.innerHTML=html;

    // 将创建的弹窗提示添加到body里
    document.querySelector("body").appendChild(hint);
    // 设置定时器两秒后移除
    let timeId=setTimeout(function(){
        hint.remove();
    },2000);
}


// 挂载到window对象上
window.utils=utils;