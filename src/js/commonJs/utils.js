/**
 * 工具函数
 */



let utils={};

//接口URL
utils.BASE_URL = 'http://139.9.177.51:8099'; // 接口请求的 URL
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

        <a href="./sports.html">
           <li class="${page=='sports'?'active':''}">
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

// 将时间转换为标准时间格式
utils.standardTime = function(date) {

    //将输入的时间转换为时间戳
    let dateTime = date.getTime();

    //将时间戳转化为格林威治时间
    let time = new Date(dateTime);


    //将格林威治时间转换为本地标准时间
    let year = time.getFullYear(); //转换为年
    let month = time.getMonth() + 1;//转换为月
    let day = time.getDate();//转换为天

    //定义一个数组，将对应的星期几的值设置好
    let weekDay = new Array(7)
    weekDay[0] = "星期天"
    weekDay[1] = "星期一"
    weekDay[2] = "星期二"
    weekDay[3] = "星期三"
    weekDay[4] = "星期四"
    weekDay[5] = "星期五"
    weekDay[6] = "星期六"
    //因为getDay()取到的是一个数字0-6，所以只有通过索引值转换为星期几
    let today = weekDay[time.getDay()];

    let hour = time.getHours();//转换为时
    let minute = time.getMinutes();//转换为分
    let second = time.getSeconds();//转换为秒

    //将时间的格式做一个小于10之后前边加0的修改

    //如果month的值小于10，那么取在month前边加上0，如果大于10，那么取month本身
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    //拼接输出标准时间格式
    // return `${"现在是北京时间:"} ${year}/${month}/${day}  ${today}  ${hour}:${minute}:${second}`;
    return `${year}-${month}-${day}`;

}


// 将location下面的search中的id提取出来
utils.getId=function(str){
  
    // 将前边的?去掉
    let str1=str.substr(1);
    // 切割字符串变成两个数组
    let arr=str1.split("&");
    // 遍历数组
    // 定义一个空对象用来存放
    let obj={};
    arr.forEach(function(item){
        // 再次将item切割开放到返回去的值中
      let arr1= item.split("=");
    // 对象的键名等于数组的第一个值
     // 对象的键值等于数组的第二个值
      obj[arr1[0]]=arr1[1];
      
    })
   return obj;
}
// 挂载到window对象上
window.utils=utils;