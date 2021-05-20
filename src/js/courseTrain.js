// 引入私用css样式
require("../css/courseTrain.less");

// 兼容写法
document.ready(function(){

    // 获取所有元素
    let videoDom=document.querySelector("video");
    let currentDom=document.querySelector("#current");
    let totalDom=document.querySelector("#total");
    let titleDom=document.querySelector("#title");

    let lastDom=document.querySelector("#last");
    let pauseDom=document.querySelector("#pause");
    let nextDom=document.querySelector("#next");

    let planDom=document.querySelector("#plan");




    // 从本地存储中拿到数据渲染到页面
    let videoList=JSON.parse(localStorage.getItem("videoList"));
    console.log(videoList);

    // 设置一个视频播放的索引值
    let index=0;
    // 遍历
    // 定义播放的函数
    function play(){
        // 渲染页面
        // 更换视频播放的地址
        videoDom.src=utils.BASE_URL+ videoList[index].videoUrl;
        // 更换当前视频所在的位置
        currentDom.textContent=index+1;
         // 更换所有视频的个数
         totalDom.textContent=videoList.length;
          // 更换视频的标题
         titleDom.textContent=videoList[index].title;
    }
    // 调用播放
    play();

    // 在视频结束之后触发事件继续切换下一个视频
    videoDom.addEventListener("ended",function(){
        index++;
        // 如果索引值小于数组的长度，就可以执行播放事件
        if(index<videoList.length){
            play();
        }
    })

    // 注册点击事件，向上切换视频
    lastDom.addEventListener("click",function(event){
        if(index>0){
            index--;
            play();
        }
    });

    
    // 注册点击事件，向下切换视频
    nextDom.addEventListener("click",function(event){
      
        if(index<videoList.length-1){
            index++;
            play();
        }
    });
   
    // 底部进度条
    setInterval(function(){
        //修改进度条宽度
        //进度=当前时间/总时间 
        console.log(videoDom.duration);
        console.log(videoDom.currentTime);
        let width = document.body.offsetWidth;
        //进度条宽度= 当前时间/视频总时间*盒子总宽度
        let num = width * (videoDom.currentTime / videoDom.duration);
        planDom.style.width = num + 'px'
    },30)

})