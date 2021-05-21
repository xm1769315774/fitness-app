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
    let commonFooter=document.createElement("commonFooter");
    //给元素节点添加一个属性
    commonFooter.classList="commonFooter";
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
    commonFooter.innerHTML=html;
    // 在body的内容之后添加新创建的节点
    document.querySelector("body").appendChild(commonFooter);
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

// 请求ajax
utils.ajax={

    get: function () {
        //如果默认参数的长度为2，证明只传入了两个值
        if (arguments.length == 2) {
            let url=arguments[0];
            let callback = arguments[1];
            //实例化ajax
            let xhr = new XMLHttpRequest();
            // console.log(arguments[0]);
            //设置请求方式及请求地址
            xhr.open("get", url);

           
            //监听xhr是否改变
            xhr.onreadystatechange = function () {
                // 判断
                if (xhr.readyState === 4 && xhr.status === 200) {

                    // 运行函数
                    console.log(arguments);
                    callback(JSON.parse(xhr.responseText));
                }
            }
            //发送
            xhr.send();


   
        } else if (arguments.length == 3) { //如果默认参数的长度为3，证明传入了三个值

            // 第二个数据是一个对象，需要将第二个数据里面的各个属性通过&符号拼接，再使用？拼接到第一个数据后面
            let obj=arguments[1];
            let arr= Object.keys(obj);//Object.keys:获取对象中所有的键名 并且返回一个数组
           
            let arr1=[];
           arr.forEach(function(item){
           arr1.push(item+"="+obj[item]);
           })

            let str2= arr1.join("&");//join:把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
          
            let str1=arguments[0];
           
            //使用？拼接两个字符串
            let url=str1+"?"+str2;

            //实例化ajax
            let xhr = new XMLHttpRequest();
           
            //设置请求方式及请求地址
            xhr.open("get", url);
           
            
         
          
            let callback = arguments[2];
            //监听xhr是否改变
            xhr.onreadystatechange = function () {
                // 判断
                if (xhr.readyState === 4 && xhr.status === 200) {

                    // 运行函数
                    callback(JSON.parse(xhr.responseText));
                }
            }
            //发送
            xhr.send();


        }

    },

    post: function (url,data,callback){
        //转换data对象为字符串
        let obj=data;
      
        let arr= Object.keys(obj);//Object.keys:获取对象中所有的键名 并且返回一个数组

        let arr1=[];
        arr.forEach(function(item){
        arr1.push(item+"="+obj[item]);
        })

         let str= arr1.join("&");//join:把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。

        //实例化ajax
        let xhr=new XMLHttpRequest();

        //设置请求方式和请求地址
        xhr.open("post",url);

         //转换请求头为form格式
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        //监听
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4 && xhr.status===200){
                callback(JSON.parse(xhr.responseText));
            }
        }

        //发送
        xhr.send(str);

    },

    common: function (data) {

        let obj=data;
       //判断：如果type值为post
        if(obj.type=="post"){
            // 则调用post方法
         ajax.post(obj.url,obj.data,obj.success);
        }else if(obj.type=="get"){
            ajax.get(obj.url, obj.data,obj.success);
        }
       
    }
};


// 
// 挂载到window对象上
window.utils=utils;