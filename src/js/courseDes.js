// 引入私用css样式
require("../css/courseDes.less");

// 兼容写法
document.ready(function(){
    // 获取所有元素
    let beginDom=document.querySelector(".begin");
    let nameDom=document.querySelector("#name");
    let descDom=document.querySelector("#desc");
    let imgurlDom=document.querySelector("#imgurl");
   

     // 调用封装的getId获取训练课程详情的id
     let str=location.search;
     let obj= utils.getId(str);
    //  console.log(obj);

    //  请求接口获取数据
     $http.get("/sports/courseDetail?id="+obj.id,function(res){
        console.log(res);
        // 渲染页面
        nameDom.textContent=res.data.name;
        descDom.textContent=res.data.desc;
        imgurlDom.src=utils.BASE_URL+res.data.imgurl;
        // 将res下面的data里的fragments存储到本地
       let videoList=res.data.fragments;
       localStorage.setItem("videoList",JSON.stringify(videoList));
     })



    // 注册事件
    beginDom.addEventListener("click",function(){
        // 跳转至课程训练模块
        location.href="./courseTrain.html";
    })




})