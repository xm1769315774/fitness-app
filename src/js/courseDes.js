// 引入私用css样式
require("../css/courseDes.less");

// 兼容写法
document.ready(function () {
    // 获取所有元素
    let beginDom = document.querySelector(".begin");
    let nameDom = document.querySelector("#name");
    let descDom = document.querySelector("#desc");
    let imgurlDom = document.querySelector("#imgurl");

    let backDom = document.querySelector("#back");
    let headerDom = document.querySelector("header");


    //注册点击事件，返回上一页
    backDom.addEventListener("click", function (event) {
        event.stopPropagation();
        location.href = "./sports.html";
    })

    // 注册点击事件，跳转至视频播放页面
    headerDom.addEventListener("click", function (event) {
        location.href = "./courseTrain.html";
        event.stopPropagation();
    })


    // 调用封装的getId获取训练课程详情的id
    let str = location.search;
    let obj = utils.getId(str);
    //  console.log(obj);

    //  请求接口获取数据
    $http.get("/sports/courseDetail?id=" + obj.id, function (res) {

        // 将res下面的data存储到本地
        let videoList = res.data;
        //    console.log(videoList);
        localStorage.setItem("videoList", JSON.stringify(videoList));

        
        // 渲染页面
        nameDom.textContent = res.data.name;
        descDom.textContent = res.data.desc;
        imgurlDom.src = utils.BASE_URL + res.data.imgurl;


    })
    //  获取本地存储的data数据渲染页面
        let localVideo = JSON.parse(localStorage.getItem("videoList"));
        
        nameDom.textContent = localVideo.name;
        descDom.textContent = localVideo.desc;
        imgurlDom.src = utils.BASE_URL + localVideo.imgurl;
        console.log(localVideo);

    // 注册事件
    beginDom.addEventListener("click", function () {
        // 跳转至课程训练模块
        location.href = "./courseTrain.html";
    })




})