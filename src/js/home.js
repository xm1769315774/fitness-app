// 引入对应的css
require("../css/home.less");

document.ready(function () {
    // 获取所有的元素
    let rank = document.querySelector("#rank");
    let punchIn = document.querySelector("#punchIn");
    let insigniaNum = document.querySelector("#insigniaNum");
    let card = document.querySelector("#card");



    // 轮播图js
    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 自动播放
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        // 切换图片效果
        effect : 'fade',
        // 分页显示
        // effect: 'coverflow',
        // slidesPerView: 2,
        // centeredSlides: true,
        // coverflowEffect: {
        //     rotate: 30,
        //     stretch: 10,
        //     depth: 60,
        //     modifier: 2,
        //     slideShadows: true
        // },
    })

    // 获取本地存储的用户信息
    let user = JSON.parse(localStorage.getItem("user"));

    // 将或区域首页数据，渲染到页面封装成一个函数，可以多次调用
    function getHome() {
        // 请求获取首页数据接口
        $http.get("/headPageInfo?userId=" + user.userId, function (res) {

            // 判断是否打卡
            if (res.data.isPunch === "true") {//如果打卡成功了
                card.style.display = "none";
            }
            // 将后台返回的数据渲染到页面
            // 今日排名
            rank.textContent = res.data.rank;
            // 运动徽章数量
            insigniaNum.textContent = res.data.insigniaNum;
            // 打卡天数
            punchIn.textContent = res.data.punchIn;


        })
    }
    // 调用
    getHome();

    //注册打卡的点击事件
    card.addEventListener("click", function (event) {
        // 获取打卡事件的接口
        console.log(11);
        $http.get("/clockIn?userId=" + user.userId, function (res) {
            // 判断是否打卡成功
            if (res.status === 0) {
                // 提示
                utils.hint(0, "滴，打卡成功");
                // 重新调用函数渲染首页数据
                getHome();
            }
        })
    })


    // 引入公共页脚
    utils.addFooter("home");


})