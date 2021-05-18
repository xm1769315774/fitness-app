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
    hint.className="hint";
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


// 公共页脚
utils.addFooter=function(page){
    // 创建一个元素节点
    let footer=document.createElement("footerS");
    // 向元素节点里边渲染内容
    let html=`
    <ul>
        <a href="./home.html">
           <li class="${page=='home'?'active':''}">
               <i class="iconHome iconfont icon-home"></i>
               <h3>首页</h3>
           </li>
        </a>

        <a href="./running.html">
           <li class="${page=='running'?'active':''}">
            <i class="iconSports iconfont icon-jianshen-xinshuai-xinzang"></i>
            <h3>运动</h3>
            </li>
        </a>

        <a href="./my.html">
            <li class="${page=='my'?'active':''}">
            <i class="iconMy iconfont icon-wode1"></i>
            <h3>我的</h3>
             </li>
        </a>
       </ul>
    `;
    footer.innerHTML=html;
    // 在body的内容之后添加新创建的节点
    document.querySelector("body").appendChild(footer);
}

// 挂载到window对象上
window.utils=utils;